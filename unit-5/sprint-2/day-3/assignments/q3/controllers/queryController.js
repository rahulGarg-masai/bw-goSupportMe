const Vehicle = require('../models/Vehicle');

const queryController = {
  getVehiclesWithLongTrips: async (req, res) => {
    try {
      const vehicles = await Vehicle.find({
        'trips.distance': { $gte: 200 }
      });
      
      res.status(200).json({ 
        success: true, 
        data: vehicles,
        message: `Found ${vehicles.length} vehicles with trips >= 200km`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getVehiclesByStartLocation: async (req, res) => {
    try {
      const targetLocations = ['Delhi', 'Mumbai', 'Bangalore'];
      const vehicles = await Vehicle.find({
        'trips.startLocation': { $in: targetLocations }
      });
      
      res.status(200).json({ 
        success: true, 
        data: vehicles,
        message: `Found ${vehicles.length} vehicles with trips starting from Delhi, Mumbai, or Bangalore`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getVehiclesWithRecentTrips: async (req, res) => {
    try {
      const cutoffDate = new Date('2024-01-01');
      const vehicles = await Vehicle.find({
        'trips.startTime': { $gte: cutoffDate }
      });
      
      res.status(200).json({ 
        success: true, 
        data: vehicles,
        message: `Found ${vehicles.length} vehicles with trips starting after Jan 1, 2024`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getCarOrTruckVehicles: async (req, res) => {
    try {
      const vehicles = await Vehicle.find({
        type: { $in: ['car', 'truck'] }
      });
      
      res.status(200).json({ 
        success: true, 
        data: vehicles,
        message: `Found ${vehicles.length} car or truck vehicles`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getVehiclesByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide both startDate and endDate query parameters' 
        });
      }

      const vehicles = await Vehicle.find({
        'trips.startTime': { 
          $gte: new Date(startDate), 
          $lte: new Date(endDate) 
        }
      });
      
      res.status(200).json({ 
        success: true, 
        data: vehicles,
        message: `Found ${vehicles.length} vehicles with trips between ${startDate} and ${endDate}`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getVehiclesByDistanceRange: async (req, res) => {
    try {
      const { minDistance = 0, maxDistance = 1000000 } = req.query;
      
      const vehicles = await Vehicle.find({
        'trips.distance': { 
          $gte: Number(minDistance), 
          $lte: Number(maxDistance) 
        }
      });
      
      res.status(200).json({ 
        success: true, 
        data: vehicles,
        message: `Found ${vehicles.length} vehicles with trips between ${minDistance}km and ${maxDistance}km`
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = queryController;