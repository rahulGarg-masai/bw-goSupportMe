const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartparking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Import routes
const authRoutes = require('../../backend/routes/auth');
const parkingSpaceRoutes = require('../../backend/routes/parkingSpaces');
const bookingRoutes = require('../../backend/routes/bookings');
const paymentRoutes = require('../../backend/routes/payments');
const locationUpdateRoutes = require('../../backend/routes/locationUpdates');
const referralRoutes = require('../../backend/routes/referrals');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/parking-spaces', parkingSpaceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/location-updates', locationUpdateRoutes);
app.use('/api/referrals', referralRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartParking API is running' });
});

// Connect to database before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports.handler = serverless(app);