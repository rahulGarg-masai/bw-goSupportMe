const express = require("express");
const { 
  addUser, 
  addProfile, 
  getUsers, 
  updateProfile, 
  deleteProfile, 
  searchUser 
} = require("../controllers/user.controller");

let UserRouter = express.Router();

// Route 1: POST /add-user - Create a new user with basic details (name, email, password)
UserRouter.post('/add-user', addUser);

// Route 2: POST /add-profile/:userId - Add a new profile to existing user
UserRouter.post('/add-profile/:userId', addProfile);

// Route 3: GET /get-users - Retrieve all users, with optional filtering by profile name
UserRouter.get('/get-users', getUsers);

// Route 4: GET /search - Search user and optionally filter by profile name
UserRouter.get('/search', searchUser);

// Route 5: PUT /update-profile/:userId/:profileName - Update existing profile URL
UserRouter.put('/update-profile/:userId/:profileName', updateProfile);

// Route 6: DELETE /delete-profile/:userId/:profileName - Delete specific profile from user
UserRouter.delete('/delete-profile/:userId/:profileName', deleteProfile);

module.exports = UserRouter