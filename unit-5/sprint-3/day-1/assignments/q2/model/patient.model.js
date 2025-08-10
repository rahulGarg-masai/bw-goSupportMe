const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    
 
  name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }



})

const PatientModel = mongoose.model('Patient',patientSchema);

module.exports = PatientModel;




