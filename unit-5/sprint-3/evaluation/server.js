const express = require('express');
const connectDB = require('./config/db.config');
require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());
//process.env.PORT
app.listen(3000,()=>{
    console.log(`server running on port `);
    
})