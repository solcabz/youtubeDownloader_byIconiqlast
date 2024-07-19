const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

//routes connection
const { connectDB } = require("./config/dbConnection"); // Import the connectDB function
const indexRouter = require("./routes/root"); // root access for api
const userRoutes = require("./routes/users"); // Import user routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const downloadRouter = require("./routes/download");

// Load environment variables from ./config/.env file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
const PORT = 3000;

// Middleware
const corsOptions = {
  origin: "https://main--iconiqlast-downloader.netlify.app", // Replace with your frontend URL
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Corrected HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter); // Authentication routes
app.use("/users", userRoutes); // Mount user routes
app.use("/profile", profileRouter); // Mount profile routes
app.use("/download", downloadRouter); // Mount Donload Routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server and connect to the database
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
