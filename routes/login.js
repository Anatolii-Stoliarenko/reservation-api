const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    //Response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
