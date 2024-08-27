// Manually updating data in MongoDB
connectDB().then(async () => {
  // Update user role after connection is established
  const User = require("./models/User"); // Ensure the correct path to your User model

  try {
    const result = await User.updateOne(
      { email: "admin@gmail.com" }, // Replace with the actual email
      { $set: { role: "admin" } }
    );
    console.log("User role updated:", result);
  } catch (err) {
    console.error("Error updating user role:", err);
  }
});
