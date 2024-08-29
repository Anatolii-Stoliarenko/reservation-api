const express = require("express");
const Reservation = require("../models/Reservation");
const router = express.Router();

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();

    // Transform the reservations to include `id` as a copy of `_id`
    const transformedReservations = reservations.map((reservation) => ({
      ...reservation.toObject(),
      id: reservation._id, // Add id field as a copy of _id
      _id: undefined, // Optionally, remove _id if you don't need it in the response
    }));

    // Send the transformed reservations as the response
    res.json({
      message: "Successfully downloaded reservations",
      reservations: transformedReservations, // Wrap the array in a field
    });
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Could not fetch reservations" });
  }
});

//Add new reservation
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

// Update reservation by MongoDB _id
router.patch("/:id", async (req, res) => {
  try {
    const reservationId = req.params.id; // MongoDB _id from the URL
    const updatedData = req.body; // Data to update the reservation with

    // Find the reservation by _id and update it with the new data
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { $set: updatedData }, // Update only the fields provided in updatedData
      { new: true, runValidators: true } // Options: return the updated document, run schema validators
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation updated successfully",
      reservation: updatedReservation, // Optionally return the updated reservation
    });
  } catch (err) {
    console.error("Error updating reservation:", err);
    res.status(500).json({ error: "Could not update reservation" });
  }
});

//Delete reservation by id from front-end
router.delete("/:id", async (req, res) => {
  try {
    const reservationId = req.params.id; // Use the custom id passed in the URL
    const deletedReservation = await Reservation.findOneAndDelete(
      reservationId
    );

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
