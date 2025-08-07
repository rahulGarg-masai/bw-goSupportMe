const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/userprofiles');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = connectDB;