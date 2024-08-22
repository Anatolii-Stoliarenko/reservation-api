const express = require("express");
const Reservation = require("../models/Reservation");

const router = express.Router();

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Could not fetch reservations" });
  }
});

// Save all reservations (overwrite)
router.post("/", async (req, res) => {
  try {
    const reservations = req.body;

    // Clear the existing collection
    await Reservation.deleteMany({});

    // Insert the new set of reservations
    await Reservation.insertMany(reservations);

    res.status(200).json({
      message: "All reservations saved successfully",
      reservations,
    });
  } catch (err) {
    console.error("Error saving reservations:", err);
    res.status(500).json({ error: "Could not save reservations" });
  }
});

module.exports = router;
