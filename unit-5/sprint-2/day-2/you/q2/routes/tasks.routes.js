const express = require("express");
const {updateTask,deleteTasks,getAllTasks,addTask} = require("../controllers/task.controller");
const {validateTaskData} = require("../middleware/task.middleware")
const TaskRouter = express.Router();

TaskRouter.get('/',getAllTasks);
TaskRouter.post('/add-task',validateTaskData,addTask);

TaskRouter.patch('/update-tasks/:id',validateTaskData,updateTask);
TaskRouter.delete('/delete-tasks',deleteTasks);


module.exports = TaskRouter;