const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role; // Using optional chaining to safely access role
    if (userRole && allowedRoles.includes(userRole)) {
      next(); // User has the required role, proceed to next middleware/route handler
    } else {
      res.status(403).json({ error: "Unauthorized access" }); // User does not have required role or role is undefined
    }
  };
};

module.exports = authorizeRole;
module.exports = authorizeRole;
