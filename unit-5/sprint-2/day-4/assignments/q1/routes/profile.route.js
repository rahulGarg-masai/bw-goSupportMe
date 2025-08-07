const express = require("express");
const { addProfile, getAllProfiles } = require("../controllers/user.controller");

const ProfileRouter = express.Router();

ProfileRouter.post('/add-profile',addProfile);
ProfileRouter.get('/get-all-profiles',getAllProfiles)
module.exports = ProfileRouter;