const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String, // Optional
  contactEmail: String, // Optional
});

module.exports = mongoose.model("User", userSchema);
