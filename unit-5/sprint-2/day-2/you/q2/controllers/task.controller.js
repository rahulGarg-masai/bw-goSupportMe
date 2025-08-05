const mongoose = require("mongoose");
const TaskModel = require("../models/Task");

const getAllTasks = async (req,res)=>{
    try {
        let tasks = await TaskModel.find({});
        res.status(200).json({msg:'tasks fetched',tasks});
    } catch (error) {
        res.status(400).json({msg:'error getting all tasks',error})
    }
}

const addTask = async (req,res) => {
    try {
        const {title,priority} = req.body;
        const existingTask = await TaskModel.findOne({title});
        if(existingTask){
            return res.status(400).json({msg:'title not unique'});
        }
        else if(!['low','medium','high'].includes(priority)){
            return res.status(400).json({
          error: "Invalid priority. Must be low, medium, or high"
        });
        }
        else {
            let task = await TaskModel.create(req.body);
            return res.status(201).json({msg:'task added successfully',task});
        
        }

    } catch (error) {
        res.status(400).json({msg:'something went wrong during adding of task',error})
        
    }
}



const deleteTasks = async (req,res) => {
    
    try {
      const { priority } = req.query;

      if (!priority) {
        return res.status(400).json({
          error: "Priority filter is required"
        });
      }

     if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
          error: "Invalid priority. Must be low, medium, or high"
        });
      }

      const result = await TaskModel.deleteMany({ priority });

      res.json({
        message: `tasks with priority '${priority}' deleted`,
        
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateTask = async (req, res) => {
      try {
          const { id } = req.params;

          // Only allow these fields to be updated
          const { title, priority, description, isCompleted } = req.body;

          // Create update object with only allowed fields
          const updateData = {};
          if (title !== undefined) updateData.title = title;
          if (priority !== undefined) updateData.priority = priority;
          if (description !== undefined) updateData.description = description;
          if (isCompleted !== undefined) {
              updateData.isCompleted = isCompleted;
              // Auto-add completion date if marked complete
              if (isCompleted === true) {
                  updateData.completionDate = new Date();
              }
          }

          const updatedTask = await TaskModel.findByIdAndUpdate(
              id,
              updateData,
              { new: true }
          );

          if (!updatedTask) {
              return res.status(404).json({ msg: 'Task not found' });
          }

          res.status(200).json({ msg: 'Task updated', task: updatedTask });

      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  module.exports = {updateTask,deleteTasks,getAllTasks,addTask};