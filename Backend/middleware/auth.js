const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // Set user to request object
    // console.log(req.user)
    next();
  } catch (err) {
    console.error('Invalid token', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
