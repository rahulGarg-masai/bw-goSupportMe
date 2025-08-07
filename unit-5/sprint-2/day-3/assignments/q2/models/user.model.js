const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: true,
    enum: ['fb','twitter', 'github', 'instagram']
  },
  url: {
    type: String,
    required: true,
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profiles: [profileSchema]
});

const UserModel = mongoose.model('users',userSchema);
const ProfileModel = mongoose.model('profiles',profileSchema);

module.exports = {UserModel,ProfileModel};