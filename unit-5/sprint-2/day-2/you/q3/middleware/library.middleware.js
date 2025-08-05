const Library = require('../models/library.model');

const validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ message: "Incomplete Data" });
  }
  
  next();
};

const checkBorrowingLimit = async (req, res, next) => {
  try {
    const { borrowerName } = req.body;
    
    if (!borrowerName) {
      return res.status(400).json({ message: "Borrower name is required" });
    }
    
    const borrowedBooks = await Library.countDocuments({
      borrowerName: borrowerName,
      status: 'borrowed'
    });
    
    if (borrowedBooks >= 3) {
      return res.status(400).json({ 
        message: "Cannot borrow more than 3 books at a time" 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking borrowing limit", error: error.message });
  }
};

const calculateOverdueFees = (borrowDate, dueDate, returnDate) => {
  if (returnDate <= dueDate) {
    return 0;
  }
  
  const overdueDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
  return overdueDays * 10; // Rs. 10 per day
};

module.exports = {
  validateBookData,
  checkBorrowingLimit,
  calculateOverdueFees
};