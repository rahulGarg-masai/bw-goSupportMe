const express = require('express');
const connectDB = require('./config/database');
const TaskRouter = require("./routes/tasks.routes");

connectDB();

const app = express();
app.use(express.json());
app.use('/tasks',TaskRouter);
app.listen(3000,()=>{
    console.log('server started..');
    
})