const express= require('express');
const DoctorModel = require('../model/doctor.model');
const { default: mongoose } = require('mongoose');
const ConsultModel = require('../model/consultation.model');

const DoctorRouter = express.Router();

DoctorRouter.post('/doctors',async (req,res) => {
    try {
        let newdoc = req.body;
        if(!newdoc)return res.status(400).json({msg:'send correct doc data'})
        else {
        await DoctorModel.create(newdoc);
        return res.status(200).json({msg:'doc crearted',newdoc});
    }
    } catch (error) {
        return res.status(400).json({msg:"error",error});
    }
})

//return list of patients consulted by this doctor
DoctorRouter.get('/doctors/:doctorId/patients',async (req,res) => {
    try {
        let {doctorId} = req.params;
        if(!doctorId){
            return res.status(400).json({msg:'invalid id'});
        }
        else {
        let patients = await ConsultModel.find({doctorId}).populate('patientId').select('doctorId').sort({consultedAt:-1}).limit(5);
        return res.status(200).json({msg:'list',patients});
        
        }
    } catch (error) {
        return res.status(400).json({msg:"error",error});
        
    }
    
})

DoctorRouter.get('/doctors/:doctorId/consultations/count',async (req,res) => {
    try {
        const {doctorId} = req.params;
        if(!doctorId){
            return res.status(400).json({msg:'invalid id'});

        }
        else {
            let count = await ConsultModel.countDocuments({doctorId});
            return res.status(200).json({msg:'count',count})
        }


    } catch (error) {
        return res.status(400).json({msg:"error",error});
        
    }
})

//mark doc inactive
DoctorRouter.delete('/doctors/:doctorId',async (req,res) => {
    try {
        const {doctorId} = req.params;
        if(!doctorId){
            return res.status(400).json({msg:'invalid id'});
        }
        await DoctorModel.findByIdAndUpdate(
            doctorId,
            {isActive:false},
            {new:true}
        )
        await ConsultModel.updateMany(
            {doctorId},
            {isActive:false}
        )
        return res.status(200).json({msg:'doctor and related consultations marked inactive'});
    } catch (error) {
        return res.status(400).json({msg:"error",error});
    }
})

module.exports = DoctorRouter;