// require('dotenv').config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const reservationRoutes = require("./routes/reservations");

// Initialize Express app
const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4200", "https://reserv-seven.vercel.app"],
  })
);
app.use(bodyParser.json());

// Routes
app.use("/reservations", reservationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
