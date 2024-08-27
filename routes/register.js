const express = require("express");
const User = require("../models/User");

const router = express.Router();

const ADMIN_EMAILS = ["admin@gmail.com", "anatolii.stoliarenko@gmail.com"];
const MODERATOR_EMAILS = ["moderator@gmail.com"];

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Determine the role based on the email
    let role = "user";
    if (ADMIN_EMAILS.includes(email)) {
      role = "admin";
    } else if (MODERATOR_EMAILS.includes(email)) {
      role = "moderator";
    }

    // Create a new user with backend-generated id
    const newUser = new User({
      name,
      email,
      password, // This will be hashed by the schema's pre-save hook
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

module.exports = router;
