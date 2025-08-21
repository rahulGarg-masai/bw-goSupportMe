const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
connectDB;
app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
    
})