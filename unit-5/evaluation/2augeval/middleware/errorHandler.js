const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value entered' });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  res.status(500).json({ message: 'Server error' });
};

module.exports = errorHandler;