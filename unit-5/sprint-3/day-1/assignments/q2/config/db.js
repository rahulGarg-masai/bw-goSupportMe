const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
         await mongoose.connect('mongodb://127.0.0.1:27017/q2');
         console.log('db connected');
         
    } catch (error) {
        console.log('error connecting to db');
        
    }
}

module.exports  = connectDB;