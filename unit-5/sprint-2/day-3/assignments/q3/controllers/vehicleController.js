const Vehicle = require('../models/Vehicle');

const vehicleController = {
  createVehicle: async (req, res) => {
    try {
      const vehicle = new Vehicle(req.body);
      await vehicle.save();
      res.status(201).json({ success: true, data: vehicle });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message,
        errors: error.errors 
      });
    }
  },

  getAllVehicles: async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getVehicleById: async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message,
        errors: error.errors 
      });
    }
  },

  deleteVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = vehicleController;