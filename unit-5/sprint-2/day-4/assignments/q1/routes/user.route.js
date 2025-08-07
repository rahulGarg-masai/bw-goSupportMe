const express = require('express');
const { addUser } = require('../controllers/user.controller');

const UserRouter = express.Router();


UserRouter.post('/add-user',addUser);



module.exports = UserRouter;