const express = require('express');
const router = express.Router();
const { 
  addBook, 
  borrowBook, 
  returnBook, 
  getBooks, 
  deleteBook 
} = require('../controllers/library.controller');
const { 
  validateBookData, 
  checkBorrowingLimit 
} = require('../middleware/library.middleware');

// Add a Book (POST /library/books)
router.post('/books', validateBookData, addBook);

// Borrow a Book (PATCH /library/borrow/:id)
router.patch('/borrow/:id', checkBorrowingLimit, borrowBook);

// Return a Book (PATCH /library/return/:id)
router.patch('/return/:id', returnBook);

// Retrieve Books (GET /library/books)
router.get('/books', getBooks);

// Delete a Book (DELETE /library/books/:id)
router.delete('/books/:id', deleteBook);

module.exports = router;