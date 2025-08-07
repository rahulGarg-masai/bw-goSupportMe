const Vehicle = require('../models/Vehicle');

const tripController = {
  addTrip: async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.vehicleId);
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }

      vehicle.trips.push(req.body);
      await vehicle.save();
      
      const newTrip = vehicle.trips[vehicle.trips.length - 1];
      res.status(201).json({ success: true, data: newTrip });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message,
        errors: error.errors 
      });
    }
  },

  updateTrip: async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.vehicleId);
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }

      const trip = vehicle.trips.id(req.params.tripId);
      if (!trip) {
        return res.status(404).json({ success: false, message: 'Trip not found' });
      }

      Object.assign(trip, req.body);
      await vehicle.save();
      
      res.status(200).json({ success: true, data: trip });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message,
        errors: error.errors 
      });
    }
  },

  deleteTrip: async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.vehicleId);
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }

      const trip = vehicle.trips.id(req.params.tripId);
      if (!trip) {
        return res.status(404).json({ success: false, message: 'Trip not found' });
      }

      trip.deleteOne();
      await vehicle.save();
      
      res.status(200).json({ success: true, message: 'Trip deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getTripsByVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.vehicleId);
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      
      res.status(200).json({ success: true, data: vehicle.trips });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = tripController;