const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/users');
        console.log('connected to db');
        
    } catch (error) {
        console.log('err connecting to db',error);
        
    }
}

module.exports = connectDB;