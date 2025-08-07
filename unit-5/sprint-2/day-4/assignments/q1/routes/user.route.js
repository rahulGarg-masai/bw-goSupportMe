const express = require('express');
const { addUser, addProfile } = require('../controllers/user.controller');

const UserRouter = express.Router();


UserRouter.post('/add-user',addUser);
UserRouter.post('/add-profile',addProfile)



module.exports = UserRouter;