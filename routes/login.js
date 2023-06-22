const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await UserModel.findOne({ username });
  
      // Check if user exists and password is correct
      if (user && user.password === password) {
        // Set user session or generate a token
        req.session.user = user; // using session-based authentication
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Logout route
  router.post('/logout', (req, res) => {
    // Clear user session or token
    req.session.user = null; // Example: clearing session for logout
    res.json({ message: 'Logout successful' });
  });

module.exports = router;