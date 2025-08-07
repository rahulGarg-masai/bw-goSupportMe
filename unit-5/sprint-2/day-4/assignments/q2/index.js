const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', rentalRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Book Rental System API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});