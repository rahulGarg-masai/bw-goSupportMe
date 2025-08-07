const express = require("express");
const { addProfile } = require("../controllers/user.controller");

const ProfileRouter = express.Router();

ProfileRouter.post('/add-profile',addProfile);

module.exports = ProfileRouter;