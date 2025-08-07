const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const tripController = require('../controllers/tripController');
const queryController = require('../controllers/queryController');

// Vehicle CRUD routes
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

// Trip routes
router.post('/:vehicleId/trips', tripController.addTrip);
router.get('/:vehicleId/trips', tripController.getTripsByVehicle);
router.put('/:vehicleId/trips/:tripId', tripController.updateTrip);
router.delete('/:vehicleId/trips/:tripId', tripController.deleteTrip);

// Advanced query routes
router.get('/queries/long-trips', queryController.getVehiclesWithLongTrips);
router.get('/queries/by-location', queryController.getVehiclesByStartLocation);
router.get('/queries/recent-trips', queryController.getVehiclesWithRecentTrips);
router.get('/queries/car-or-truck', queryController.getCarOrTruckVehicles);
router.get('/queries/by-date-range', queryController.getVehiclesByDateRange);
router.get('/queries/by-distance-range', queryController.getVehiclesByDistanceRange);

module.exports = router;