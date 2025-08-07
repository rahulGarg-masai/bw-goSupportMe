const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  email: { type: String, required: true, unique: true },
});

const profileSchema = new mongoose.Schema({
  bio: { type: String },
  socialMediaLinks: [String],
  user: {type: mongoose.Schema.Types.ObjectId,required:true,unique:true,ref:"User"},
});

const UserModel = mongoose.model('User',userSchema);
const ProfileModel = mongoose.model('Profile',profileSchema);

module.exports = { UserModel ,ProfileModel};
