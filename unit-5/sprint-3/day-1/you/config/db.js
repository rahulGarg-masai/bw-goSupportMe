const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    console.log('db connected successfully');
    } catch (error) {
        console.log('error while connecting to db',error);
        
    }
    
}

module.exports = connectDB;