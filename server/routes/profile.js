//profile Route
const express = require("express");
const router = express.Router();
const ProfileController = require("../controller/profileController");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

// route for http://localhost:3000/profile/
router.get(
  "/",
  authenticateJWT,
  authorizeRole(["admin", "user"]),
  ProfileController.getUserprofile // Ensure this is correctly imported and defined
);

module.exports = router;
