const express = require("express");
const {getAllTasks , addTask , deleteTask , updateTask} = require("../controllers/taskController")
const TaskRouter = express.Router();

TaskRouter.get('/',getAllTasks);
TaskRouter.post('/add-task',addTask);
TaskRouter.delete('/delete-task/:taskId',deleteTask);
TaskRouter.put('/update-task/:taskId',updateTask);

module.exports = TaskRouter;