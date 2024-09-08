const mongoose = require("mongoose");
const User = require("./User");

const reservationSchema = new mongoose.Schema({
  date: {
    type: String, // 'yyyy-MM-dd' format
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    enum: [
      "Balkon",
      "Duża kaplica",
      "Mała kaplica",
      "Katechetyczne",
      "Harcówka",
    ],
    required: true,
  },
  type: {
    type: String,
    enum: ["Polish", "Ukrainian", "Other"],
    default: "Other",
  },
  user: {
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
    role: {
      type: String,
      required: true,
      enum: ["admin", "moderator", "user"],
    },
  },
  comments: String, // Optional
  status: {
    type: String,
    enum: ["Pending", "Approved"],
    default: "Pending",
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

// Update the updatedAt field before saving
reservationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Reservation", reservationSchema);
