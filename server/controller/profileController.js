const User = require("../model/userModel");

const getUserprofile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user) {
      // Only include specific fields in the response
      const { name, username, email, role } = user;
      res.json({ profile: { name, username, email, role } });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserprofile,
};
