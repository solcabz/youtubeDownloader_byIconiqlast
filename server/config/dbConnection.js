const mongoose = require("mongoose");

const uri =
  "mongodb+srv://solcabz:Cabzsol121995@iconiqsol.g4vupkv.mongodb.net/youtubeIconiq?retryWrites=true&w=majority";

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
