const express = require("express");
const router = express.Router();
const prisma = require("../db");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.use(auth);
router.use(role(["STORE_OWNER"]));

/* -------- OWNER DASHBOARD -------- */

router.get("/dashboard", async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: { ownerId: req.user.id },
      include: {
        ratings: {
          include: {
            user: true
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const averageRating =
      store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
          store.ratings.length
        : 0;

    res.json({
      storeName: store.name,
      averageRating,
      ratedUsers: store.ratings.map(r => ({
        userName: r.user.name,
        userEmail: r.user.email,
        rating: r.rating
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;