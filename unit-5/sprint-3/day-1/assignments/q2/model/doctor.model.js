const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    
  name: String,
  specialization: String,
  isActive: { type: Boolean, default: true }


})

const DoctorModel = mongoose.model('Doctor',doctorSchema);

module.exports = DoctorModel;