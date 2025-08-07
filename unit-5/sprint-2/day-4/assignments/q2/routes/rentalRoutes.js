const express = require('express');
const User = require('../models/User');
const Book = require('../models/Book');
const router = express.Router();

// Rent Book (POST /rent-book)
router.post('/rent-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    if (!userId || !bookId) {
      return res.status(400).json({ error: 'User ID and Book ID are required' });
    }

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user already has this book rented
    if (user.rentals.includes(bookId)) {
      return res.status(400).json({ error: 'User has already rented this book' });
    }

    // Add book to user's rentals
    user.rentals.push(bookId);
    await user.save();

    // Add user to book's rentals
    book.rentals.push(userId);
    await book.save();

    res.json({ 
      message: 'Book rented successfully',
      rental: {
        user: { id: user._id, name: user.name },
        book: { id: book._id, title: book.title }
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Return Book (POST /return-book)
router.post('/return-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    if (!userId || !bookId) {
      return res.status(400).json({ error: 'User ID and Book ID are required' });
    }

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user has this book rented
    if (!user.rentals.includes(bookId)) {
      return res.status(400).json({ error: 'User has not rented this book' });
    }

    // Remove book from user's rentals
    user.rentals = user.rentals.filter(rental => !rental.equals(bookId));
    await user.save();

    // Remove user from book's rentals
    book.rentals = book.rentals.filter(rental => !rental.equals(userId));
    await book.save();

    res.json({ 
      message: 'Book returned successfully',
      return: {
        user: { id: user._id, name: user.name },
        book: { id: book._id, title: book.title }
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;