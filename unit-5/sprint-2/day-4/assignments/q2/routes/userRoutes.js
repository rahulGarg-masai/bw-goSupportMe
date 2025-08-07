const express = require('express');
const User = require('../models/User');
const Book = require('../models/Book');
const router = express.Router();

// Add User (POST /add-user)
router.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = new User({ name, email });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Get User Rentals (GET /user-rentals/:userId)
router.get('/user-rentals/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('rentals');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        rentals: user.rentals
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;