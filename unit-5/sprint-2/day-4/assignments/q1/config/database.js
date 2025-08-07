const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/q1');
      console.log('db connected');
      
      
    } catch (error) {
        res.status(400).json({msg:'error',error})
    }
}

module.exports = connectDB;