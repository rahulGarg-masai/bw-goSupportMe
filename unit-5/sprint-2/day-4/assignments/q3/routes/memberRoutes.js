const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.post('/add-member', async (req, res) => {
  try {
    const { _id, name } = req.body;
    
    if (!_id || _id.length > 12) {
      return res.status(400).json({ error: 'ID is required and must be 12 characters or less' });
    }
    
    const member = new Member({
      _id,
      name,
      borrowedBooks: []
    });
    
    await member.save();
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Member name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.get('/member-borrowed-books', async (req, res) => {
  try {
    const { memberId } = req.query;
    
    if (!memberId) {
      return res.status(400).json({ error: 'Member ID is required' });
    }
    
    const member = await Member.findById(memberId).populate('borrowedBooks._id', 'title author');
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ memberId, name: member.name, borrowedBooks: member.borrowedBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;