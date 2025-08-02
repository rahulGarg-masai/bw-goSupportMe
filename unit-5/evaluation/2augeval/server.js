const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

});