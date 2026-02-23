const express = require("express");
const router = express.Router();
const prisma = require("../db");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.use(auth);
router.use(role(["USER"]));

/* -------- VIEW STORES -------- */

router.get("/stores", async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true
      }
    });

    const result = stores.map(store => {
      const averageRating =
        store.ratings.length > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
          : 0;

      const userRating = store.ratings.find(
        r => r.userId === req.user.id
      );

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating,
        userRating: userRating ? userRating.rating : null
      };
    });

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* -------- SUBMIT OR UPDATE RATING -------- */

router.post("/rate", async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId: req.user.id,
          storeId
        }
      },
      update: {
        rating
      },
      create: {
        rating,
        userId: req.user.id,
        storeId
      }
    });

    res.json({ message: "Rating submitted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;