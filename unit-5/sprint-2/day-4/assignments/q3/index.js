const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const borrowReturnRoutes = require('./routes/borrowReturnRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/librarymanagement')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/', bookRoutes);
app.use('/', memberRoutes);
app.use('/', borrowReturnRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});