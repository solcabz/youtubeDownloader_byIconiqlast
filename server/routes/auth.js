// login route

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });
const secretkey = process.env.JWT_SECRET_KEY;

// POST /auth/login - User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username exists in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password hashes
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      secretkey,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Set token and user role in cookies
    res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 1000 }); // 1 hour
    res.cookie("userRole", user.role, {
      httpOnly: true,
      maxAge: 2 * 60 * 1000,
    }); // 1 hour

    // Return user information
    res.json({
      token: token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.clearCookie("userRole");
//   res.json({ message: "Logout successful" });
// });

module.exports = router;
