const jwt = require('jsonwebtoken');

// Middleware function to authenticate using JWT
const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach decoded user data to request
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
