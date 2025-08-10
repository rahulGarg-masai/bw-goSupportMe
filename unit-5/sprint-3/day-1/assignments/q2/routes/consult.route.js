const express= require('express');
const ConsultModel = require('../model/consultation.model');
const ConsultRouter = express.Router();

ConsultRouter.post('/consultations',async (req,res) => {
    try {
        const {doctorId,patientId} = req.body;
        if(!doctorId || !patientId){
            return res.status(400).json({msg:'nope'});
        }
        else {
            await ConsultModel.create({doctorId,patientId});
            return res.status(200).json({msg:'done'});
        }
    } catch (error) {
        return res.status(400).json({msg:"error",error});
        
    }
    
})

//get last five active consulatations-
//approach - filter for isActive , then sort based on created date
//in descending order and pick first five.
ConsultRouter.get('/consultations/recent',async (req,res) => {
    try {
        const lastFive = await ConsultModel.find({isActive:true}).sort({consultedAt:-1}).limit(5);
        return res.status(200).json({msg:'recent consultations', consultations: lastFive});
    } catch (error) {
        return res.status(400).json({msg:"error",error});
    }
})


module.exports = ConsultRouter;