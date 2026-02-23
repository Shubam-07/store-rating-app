const express = require("express");
const router = express.Router();
const prisma = require("../db");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const bcrypt = require("bcryptjs");

router.use(auth);
router.use(role(["ADMIN"]));

/* ---------------- DASHBOARD ---------------- */

router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.json({ totalUsers, totalStores, totalRatings });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- ADD USER ---------------- */

router.post("/add-user", async (req, res) => {
  try {
    const { name, email, password, address, role: userRole } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        address,
        role: userRole
      }
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

/* ---------------- ADD STORE ---------------- */

router.post("/add-store", async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId
      }
    });

    res.json(store);

  } catch (error) {
    res.status(500).json({ message: "Error creating store" });
  }
});

/* ---------------- VIEW USERS WITH FILTER ---------------- */

router.get("/users", async (req, res) => {
  try {
    const { name = "", email = "", role: roleFilter, sort = "name", order = "asc" } = req.query;

    const users = await prisma.user.findMany({
      where: {
        name: { contains: name },
        email: { contains: email },
        role: roleFilter || undefined
      },
      orderBy: {
        [sort]: order
      }
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* ---------------- VIEW STORES WITH AVG RATING ---------------- */

router.get("/stores", async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true
      }
    });

    const result = stores.map(store => {
      const avg =
        store.ratings.length > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
          : 0;

      return {
        ...store,
        averageRating: avg
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Error fetching stores" });
  }
});

module.exports = router;