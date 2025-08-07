const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const router = express.Router();

// Add Book (POST /add-book)
router.post('/add-book', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const book = new Book({ 
      title, 
      author, 
      genre: genre || 'General' 
    });
    await book.save();
    
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Book Renters (GET /book-renters/:bookId)
router.get('/book-renters/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('rentals');
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      book: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        renters: book.rentals
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Book (PUT /update-book/:bookId)
router.put('/update-book/:bookId', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const updateData = {};
    
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (genre) updateData.genre = genre;

    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Book (DELETE /delete-book/:bookId)
router.delete('/delete-book/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Remove book reference from all users' rentals arrays
    await User.updateMany(
      { rentals: book._id },
      { $pull: { rentals: book._id } }
    );

    // Delete the book
    await Book.findByIdAndDelete(req.params.bookId);
    
    res.json({ message: 'Book deleted successfully and removed from user rentals' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;