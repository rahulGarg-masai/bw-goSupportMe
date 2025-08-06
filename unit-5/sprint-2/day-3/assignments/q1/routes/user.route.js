const express = require("express");
const { addUser, getUserData, addAddress, userSummary } = require("../controllers/user.controller");

const UserRouter = express.Router();

UserRouter.post('/users',addUser);
UserRouter.get('/users/:userId',getUserData)
UserRouter.post('/users/:userId/address',addAddress);
UserRouter.get('/users/summary',userSummary);

module.exports = UserRouter;