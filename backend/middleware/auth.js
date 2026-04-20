const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  let token = req.header('Authorization');

  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  } else {
    token = req.header('x-auth-token'); // Fallback
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
