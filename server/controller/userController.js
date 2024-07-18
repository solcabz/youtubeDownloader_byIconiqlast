const User = require("../model/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Controller methods

// Add user
const createUser = async (req, res) => {
  const { name, username, email, role, password } = req.body;

  try {
    // Validate required fields
    if (!name || !username || !email || !role || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Hash password before storing (using bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      role,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await newUser.save();

    res
      .status(201)
      .json({ data: newUser._id, message: "User added successfully" });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name username email role");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const isValidObjectId = mongoose.isValidObjectId(req.params.id);
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const user = await User.findById(req.params.id, "name username email role");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user by id
const updateUserById = async (req, res) => {
  try {
    const { name, username, email, role, password } = req.body;
    const updateFields = { name, username, email, role };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, projection: "name username email role" }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user by id
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
