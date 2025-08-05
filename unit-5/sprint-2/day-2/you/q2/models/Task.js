const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    priority:String,
    isCompleted:Boolean,
    completionDate:Date,
    dueDate:Date
});

const TaskModel = mongoose.model("Task",taskSchema);

module.exports = TaskModel;