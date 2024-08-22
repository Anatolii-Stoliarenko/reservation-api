const mongoose = require("mongoose");
const User = require("./User");

const reservationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
  user: {
    type: User.schema,
    required: true,
  },
  comments: String, // Optional
  status: {
    type: String,
    enum: ["Pending", "Approved"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
