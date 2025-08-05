const Library = require('../models/library.model');
const { calculateOverdueFees } = require('../middleware/library.middleware');

const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    
    const newBook = new Library({
      title,
      author,
      status: 'available'
    });
    
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowerName } = req.body;
    
    const book = await Library.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (book.status !== 'available') {
      return res.status(400).json({ message: "Book is not available for borrowing" });
    }
    
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);
    
    book.status = 'borrowed';
    book.borrowerName = borrowerName;
    book.borrowDate = borrowDate;
    book.dueDate = dueDate;
    book.returnDate = null;
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Library.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (book.status !== 'borrowed') {
      return res.status(400).json({ message: "Book is not currently borrowed" });
    }
    
    const returnDate = new Date();
    const overdueFees = calculateOverdueFees(book.borrowDate, book.dueDate, returnDate);
    
    book.status = 'available';
    book.returnDate = returnDate;
    book.overdueFees = overdueFees;
    book.borrowerName = null;
    book.borrowDate = null;
    book.dueDate = null;
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    
    const books = await Library.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Library.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (book.status === 'borrowed') {
      return res.status(400).json({ message: "Cannot delete a book that is currently borrowed" });
    }
    
    await Library.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};

module.exports = {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook
};