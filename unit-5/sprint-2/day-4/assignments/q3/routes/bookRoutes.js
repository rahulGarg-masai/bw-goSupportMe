const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Member = require('../models/Member');

router.post('/add-book', async (req, res) => {
  try {
    const { _id, title, author, publishedYear, genres } = req.body;
    
    if (!_id || _id.length > 12) {
      return res.status(400).json({ error: 'ID is required and must be 12 characters or less' });
    }
    
    const book = new Book({
      _id,
      title,
      author,
      publishedYear,
      genres: genres || [],
      status: 'available'
    });
    
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Book title already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.delete('/delete-book', async (req, res) => {
  try {
    const { bookId } = req.body;
    
    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    await Member.updateMany(
      { 'borrowedBooks._id': bookId },
      { $pull: { borrowedBooks: { _id: bookId } } }
    );
    
    await Book.findByIdAndDelete(bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/book-details', async (req, res) => {
  try {
    const { bookId } = req.query;
    
    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }
    
    const book = await Book.findById(bookId).select('_id title author');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/book-borrowers', async (req, res) => {
  try {
    const { bookId } = req.query;
    
    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }
    
    const book = await Book.findById(bookId).populate('borrowers', '_id name');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ bookId, borrowers: book.borrowers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;