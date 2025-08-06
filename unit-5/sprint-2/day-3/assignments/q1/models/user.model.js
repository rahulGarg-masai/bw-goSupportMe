const mongoose = require("mongoose");

// Using addressSchema as a subdocument instead of a nested object for better data validation,
// schema reusability, and to enable individual address operations with proper Mongoose methods
const addressSchema = new mongoose.Schema({
    street:String,
    city:String,
    state:String,
    country:{type:String,default:"India"},
    pincode:Number
});

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    addresses:[addressSchema]     
})


const UserModel = mongoose.model('users',userSchema);
const AddressModel = mongoose.model('users',addressSchema);

module.exports = {UserModel,AddressModel};