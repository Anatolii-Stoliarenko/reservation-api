// require('dotenv').config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");

//const authenticateToken = require("./middleware/authenticateToken");
const reservationRoutes = require("./routes/reservations");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");

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
app.use("/reservations", reservationRoutes); // Protected routes: app.use('/reservations', authenticateToken, reservationRoutes);
app.use(registerRoutes);
app.use(loginRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
