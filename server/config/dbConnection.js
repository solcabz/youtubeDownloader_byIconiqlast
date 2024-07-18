const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });
const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
}

module.exports = { connectDB };
