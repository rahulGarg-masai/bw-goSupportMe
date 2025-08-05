const mongoose = require("mongoose");
const TaskModel = require("../models/Task");//task model

const getAllTasks =  async (req,res)=>{
    try{
    let tasks = await TaskModel.find({});
    res.status(200).json({msg:'all tasks retreived',tasks});
    }catch(err){
        res.status(400).json({msg:'error getting all tasks',err});
        
        
    }
}

const addTask = async (req,res)=>{
    try{
let task = await TaskModel.create(req.body);
res.status(201).json({msg:'task added successfully',task});
    }catch(err){
        res.status(400).json({msg:'error adding a task',err});
        
    }
}

const deleteTask = async (req,res)=>{
    try{
    const {taskId} = req.params;
    let task =  await TaskModel.findById(taskId);
    if(!task){
        res.status(404).json({msg:"task not found"});
    }
    else {
        await TaskModel.findByIdAndDelete(taskId);
        res.status(200).json({msg:"task deleted successfully"});
    }

    }catch(err){
        res.status(400).json({msg:`error while deleting task`,err});
        
    }
}

const updateTask = async (req,res)=>{
    try{
    const {taskId} = req.params;
    let task =  await TaskModel.findById(taskId);
    if(!task){
        res.status(404).json({msg:"task not found"});
    }
    else {
        await TaskModel.findByIdAndUpdate(taskId,req.body);
        res.status(200).json({msg:"task updated successfully"});
    }

    }catch(err){
        res.status(400).json({msg:`error while updating task`,err});
        
    }
}

module.exports  = {getAllTasks , addTask , deleteTask , updateTask};