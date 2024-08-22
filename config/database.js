const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anatoliistoliarenko:ygCsiC4PA0MFRuiI@reservation-cluster.nsmg2.mongodb.net/reservationsDB?retryWrites=true&w=majority&appName=reservation-cluster",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
