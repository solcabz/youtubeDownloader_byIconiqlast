//user Route
const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const authenticateJWT = require("../middleware/authenticateJWT");
const authorizeRole = require("../middleware/authorizeRole");

// POST /users/addUser - Create a new user (requires admin role)
router.post(
  "/addUser",
  authenticateJWT,
  authorizeRole(["admin"]),
  UserController.createUser
);

// GET /users/userlist - Get all users (requires admin or moderator role)
router.get(
  "/userlist",
  authenticateJWT,
  authorizeRole(["admin", "moderator"]),
  UserController.getAllUsers
);

// GET /users/:id - Get a user by ID (requires admin or user role)
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin", "user"]),
  UserController.getUserById
);

// PUT /users/:id - Update a user by ID (requires admin or user role)
router.put(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin", "user"]),
  UserController.updateUserById
);

// DELETE /users/:id - Delete a user by ID (requires admin role)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin"]),
  UserController.deleteUserById
);

module.exports = router;
