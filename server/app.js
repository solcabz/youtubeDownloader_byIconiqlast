const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from ./config/.env file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

// Import the connectDB function
const { connectDB } = require("./config/dbConnection");

// Import routes
const indexRouter = require("./routes/root");
const userRoutes = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = 3000;

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter); // Authentication routes
app.use("/users", userRoutes); // User routes
app.use("/profile", profileRouter); // Profile routes
app.use("/download", downloadRouter); // Download routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server and connect to the database
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
