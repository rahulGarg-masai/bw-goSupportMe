const express = require('express');
const StudentModel = require('../models/student.model');
const courseModel = require('../models/course.model');
const enrollmentModel = require('../models/enrollment.model');

const EnrollRouter = express.Router();

EnrollRouter.post('/enroll',async (req,res)=>{
    try {
        let {studentId,courseId} = req.body;
        const student = await StudentModel.findOne({_id:studentId,isActive:true});
        const course = await courseModel.findOne({_id:courseId,isActive:true});
        if(!student || !course){
            return res.status(400).json({msg:'baalak ya course missing or active nhi h'})
        }
        else {
        let newEnroll = await enrollmentModel.create({studentId,courseId});
        return res.status(200).json({msg:'enrollment successfull',newEnroll});
        }
    } catch (error) {
        return res.status(400).json({msg:'error',error})
        
    }
})


module.exports = EnrollRouter;