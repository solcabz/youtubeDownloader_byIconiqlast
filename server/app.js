const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

// Import the connectDB function and routes
const { connectDB } = require("./config/dbConnection");
const indexRouter = require("./routes/root");
const userRoutes = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const downloadRouter = require("./routes/download");

// Import custom CORS middleware
const allowCors = require("./middleware/allowCors");

// Load environment variables from ./config/.env file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
const PORT = 3000;

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Apply CORS middleware to all routes
app.use(allowCors);

// Route setup
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", userRoutes);
app.use("/profile", profileRouter);
app.use("/download", downloadRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Function to start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit with a failure code
  }
};

startServer();
