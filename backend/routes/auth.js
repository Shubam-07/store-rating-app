const express = require("express");
const router = express.Router();
const prisma = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// SIGNUP (Normal User)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Validation
    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: "Name must be 20-60 characters" });
    }

    if (address.length > 400) {
      return res.status(400).json({ message: "Address too long" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password format" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role: "USER"
      }
    });

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;