const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Get the token from the request header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // Attach the decoded token payload (user info) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
}

module.exports = authenticateToken;
