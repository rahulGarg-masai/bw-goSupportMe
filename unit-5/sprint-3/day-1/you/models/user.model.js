const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : {type:String,required:true,unique:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    role:{type:String,enum:['User', 'Moderator'],default:'User'}
});
const UserModel = await mongoose.model('User',userSchema);

module.exports = UserModel;