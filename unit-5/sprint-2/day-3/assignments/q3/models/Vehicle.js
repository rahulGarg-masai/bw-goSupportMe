const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  startLocation: {
    type: String,
    required: [true, 'Start location is required']
  },
  endLocation: {
    type: String,
    required: [true, 'End location is required']
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required'],
    min: [0.01, 'Distance must be greater than 0']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  }
});

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: {
      values: ['car', 'truck', 'bike'],
      message: 'Type must be car, truck, or bike'
    }
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  trips: [tripSchema]
}, {
  timestamps: true
});

vehicleSchema.pre('validate', function() {
  this.trips.forEach(trip => {
    if (trip.endTime <= trip.startTime) {
      throw new Error('End time must be after start time');
    }
  });
});

module.exports = mongoose.model('Vehicle', vehicleSchema);