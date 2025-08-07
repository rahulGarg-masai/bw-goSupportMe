const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Member = require('../models/Member');

router.post('/borrow-book', async (req, res) => {
  try {
    const { bookId, memberId } = req.body;
    
    if (!bookId || !memberId) {
      return res.status(400).json({ error: 'Book ID and Member ID are required' });
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    if (book.status === 'borrowed') {
      return res.status(400).json({ error: 'Book is already borrowed' });
    }
    
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    book.status = 'borrowed';
    if (!book.borrowers.includes(memberId)) {
      book.borrowers.push(memberId);
    }
    await book.save();
    
    const bookExists = member.borrowedBooks.find(b => b._id === bookId);
    if (!bookExists) {
      member.borrowedBooks.push({
        _id: bookId,
        title: book.title
      });
    }
    await member.save();
    
    res.json({ message: 'Book borrowed successfully', book: { _id: bookId, title: book.title }, member: { _id: memberId, name: member.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/return-book', async (req, res) => {
  try {
    const { bookId, memberId } = req.body;
    
    if (!bookId || !memberId) {
      return res.status(400).json({ error: 'Book ID and Member ID are required' });
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    if (!book.borrowers.includes(memberId)) {
      return res.status(400).json({ error: 'Book is not borrowed by this member' });
    }
    
    book.borrowers = book.borrowers.filter(id => id !== memberId);
    if (book.borrowers.length === 0) {
      book.status = 'available';
    }
    await book.save();
    
    member.borrowedBooks = member.borrowedBooks.filter(b => b._id !== bookId);
    await member.save();
    
    res.json({ message: 'Book returned successfully', book: { _id: bookId, title: book.title }, member: { _id: memberId, name: member.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;