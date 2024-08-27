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

//Add one reservation
router.post("/", async (req, res) => {
  try {
    const reservationData = req.body;
    const newReservation = new Reservation(reservationData);
    await newReservation.save();

    res.status(201).json({
      message: "Reservation added successfully",
    });
  } catch (err) {
    console.error("Error saving reservation:", err);
    res.status(500).json({ error: "Could not save reservation" });
  }
});

//Update reservation by id from front-end
router.patch("/:id", async (req, res) => {
  try {
    const reservationId = req.params.id; // Use the custom id passed in the URL
    const updatedData = req.body;

    // Find the reservation by the custom id field instead of _id
    const updatedReservation = await Reservation.findOneAndUpdate(
      { id: reservationId }, // Search by the custom id field
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation updated successfully",
    });
  } catch (err) {
    console.error("Error updating reservation:", err);
    res.status(500).json({ error: "Could not update reservation" });
  }
});

//Delite reservation by id from front-end
router.delete("/:id", async (req, res) => {
  try {
    const reservationId = req.params.id; // Use the custom id passed in the URL

    // Find the reservation by the custom id field and delete it
    const deletedReservation = await Reservation.findOneAndDelete({
      id: reservationId,
    });

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting reservation:", err);
    res.status(500).json({ error: "Could not delete reservation" });
  }
});

module.exports = router;
