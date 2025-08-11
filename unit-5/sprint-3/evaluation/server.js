const express = require('express');
const connectDB = require('./config/db.config');
const GameRouter = require('./routes/gameRoutes');
const PublisherRouter = require('./routes/publisherRoutes');
require('dotenv').config();

connectDB();

const app = express();



app.use(express.json());



app.use(GameRouter);
app.use(PublisherRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})