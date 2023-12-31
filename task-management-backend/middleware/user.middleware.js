const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = {
  authenticateToken: authenticateToken,
};
