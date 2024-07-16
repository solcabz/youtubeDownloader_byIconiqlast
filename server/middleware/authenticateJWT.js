// authenticateJWT.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });
const secretkey = process.env.JWT_SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Get token from Authorization header

  if (token) {
    jwt.verify(token, secretkey, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ error: "Forbidden" });
      }
      req.user = user; // Attach decoded user information to request object
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateJWT;
