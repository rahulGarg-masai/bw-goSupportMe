const express = require('express');
const connectDB = require('./config/database');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/vehicles', vehicleRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Vehicle Trip Management System API',
    endpoints: {
      vehicles: {
        'POST /api/vehicles': 'Create a new vehicle',
        'GET /api/vehicles': 'Get all vehicles',
        'GET /api/vehicles/:id': 'Get vehicle by ID',
        'PUT /api/vehicles/:id': 'Update vehicle',
        'DELETE /api/vehicles/:id': 'Delete vehicle'
      },
      trips: {
        'POST /api/vehicles/:vehicleId/trips': 'Add trip to vehicle',
        'GET /api/vehicles/:vehicleId/trips': 'Get all trips for vehicle',
        'PUT /api/vehicles/:vehicleId/trips/:tripId': 'Update trip',
        'DELETE /api/vehicles/:vehicleId/trips/:tripId': 'Delete trip'
      },
      queries: {
        'GET /api/vehicles/queries/long-trips': 'Vehicles with trips >= 200km',
        'GET /api/vehicles/queries/by-location': 'Vehicles with trips from Delhi/Mumbai/Bangalore',
        'GET /api/vehicles/queries/recent-trips': 'Vehicles with trips after Jan 1, 2024',
        'GET /api/vehicles/queries/car-or-truck': 'Car or truck type vehicles',
        'GET /api/vehicles/queries/by-date-range?startDate=...&endDate=...': 'Vehicles by date range',
        'GET /api/vehicles/queries/by-distance-range?minDistance=...&maxDistance=...': 'Vehicles by distance range'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});