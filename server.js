const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the CORS package

const app = express();

const PORT = 3000;

const reservationsFilePath = path.join(__dirname, "reservations.json"); // Path to your reservations file
const usersFilePath = path.join(__dirname, "users.json"); // Path to your users file

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4200", "https://reserv-seven.vercel.app"],
  })
); // Use CORS middleware
app.use(bodyParser.json());

// Load all reservations
app.get("/reservations", (req, res) => {
  fs.readFile(reservationsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading reservations file:", err);
      return res
        .status(500)
        .json({ error: "Could not read reservations file" });
    }
    const reservations = JSON.parse(data);
    res.json(reservations);
  });
});

//save all reservation
app.post("/reservations", (req, res) => {
  const reservations = req.body;
  fs.writeFile(
    reservationsFilePath,
    JSON.stringify(reservations, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error saving reservations:", err);
        return res.status(500).json({ error: "Could not save reservations" });
      }
      res
        .status(200)
        .json({ message: "Reservations saved successfully", reservations });
    }
  );
});

// Add a new reservation
app.post("/reservations", (req, res) => {
  const newReservation = req.body;

  fs.readFile(reservationsFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Could not read reservations file" });
    }

    const reservations = JSON.parse(data);
    reservations.push(newReservation);

    fs.writeFile(
      reservationsFilePath,
      JSON.stringify(reservations, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Could not save reservations" });
        }
        res
          .status(200)
          .json({ message: "Reservation added successfully", reservations });
      }
    );
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
