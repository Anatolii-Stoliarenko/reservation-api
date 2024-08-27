const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "moderator", "user"], // Define the allowed values for role
    default: "user", // Set a default role
  },

  // Optional Fields
  phone: {
    type: String,
    default: null,
  },
  contactEmail: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: String, // This could be a URL or a file path
    default: null,
  },
  status: {
    type: String,
    default: "active", // Can be 'active', 'suspended', 'deleted', etc.
  },
  lastLogin: {
    type: Date,
    default: null,
  },

  // Security Features
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
    default: null,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: {
    type: String,
    default: null,
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed, // Can store any data type
    default: {},
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
