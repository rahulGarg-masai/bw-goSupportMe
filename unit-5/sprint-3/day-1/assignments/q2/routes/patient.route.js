const express = require('express');
const PatientModel = require('../model/patient.model');
const ConsultModel = require('../model/consultation.model');

const PatientRouter = express.Router();

PatientRouter.post('/patients',async (req,res) => {
    try {
        let newPatient = req.body;
    await PatientModel.create(newPatient);
    return res.status(200).json({msg:'patient created',newPatient});
    
    } catch (error) {
        return res.status(400).json({msg:"error",error});
        
}});
    
PatientRouter.get('/patients/:patientId/doctors',async (req,res) => {
    try {
        const {patientId} = req.params;
    if(!patientId){
            return res.status(400).json({msg:'invalid id'});

    }
    else {
        let doctors = await ConsultModel.find({patientId}).populate('doctorId').select('patientId');
        return res.status(200).json({msg:'list',doctors});
    }
    } catch (error) {
        return res.status(400).json({msg:"error",error});
        
    }
})

//all active male patients
PatientRouter.get('/patients',async (req,res) => {
    try {
        const {gender} = req.query;
        let patients = await PatientModel.find({gender:'male',isActive:true});
        return res.status(200).json({msg:'list', patients});
    } catch (error) {
        return res.status(400).json({msg:"error",error});
    }
})

PatientRouter.delete('/patients/:patientId',async (req,res) => {
    try {
        const {patientId} = req.params;
        if(!patientId){
            return res.status(400).json({msg:'invalid id'});
        }
        await PatientModel.findByIdAndUpdate(
            patientId,
            {isActive:false},
            {new:true}
        )
        await ConsultModel.updateMany(
            {patientId},
            {isActive:false}
        )
        return res.status(200).json({msg:'Patient and related consultations marked inactive'});
    } catch (error) {
        return res.status(400).json({msg:"error",error});
    }
})

module.exports = PatientRouter;