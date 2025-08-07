const mongoose = require("mongoose");
const { UserModel } = require("../../q1/models/user.model");

const addUser = async (req, res) => {
  try {
    let user = req.body;
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = await UserModel.create(user);
      return res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const addProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    let profile = req.body;
    let updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { profiles: profile } },
      { new: true }
    );
    res.status(201).json({ msg: updatedUser });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getUsers = async (req, res) => {
  try {
    let { proName } = req.query;
    let filter = {};
    if (proName) {
      //query exists , need to filter and return
      filter = {
        "profiles.profileName": proName,
      };
    }
    //let users = await UserModel.find({});
    let users = await UserModel.find(filter);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profileName } = req.params;
    const { url } = req.body;
    let user = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "profiles.profileName": profileName,
      },
      {
        $set: { "profiles.$.url": url },
      },

      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User or profile not found" });
    } else {
      return res.status(200).json({ msg: "user updated", user });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const deleteProfile = async (req, res) => {
  try {
    let { userId } = req.params;
    let { profileName } = req.params;
    let updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { profiles: { profileName: profileName } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ msg: "Profile deleted", user: updatedUser });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const searchUser = async (req,res) => {
    try {
        let {userName} = req.query;
        let {profileName} = req.query;
        if(userName&&profileName){
            let user = await UserModel.findOne({name:userName});
            let profile = user.profiles.find(p=>p.profileName===profileName);
            return res.status(200).json(profile);  
        }
        else if(userName && !profileName){
            let user = await UserModel.find({name:userName});
            return res.status(200).json({msg:'User found, but profile not found',user});  
            
        }
        else{
            return res.status(404).json({msg:"User not found"});
        }
    } catch (error) {
    res.status(400).json({ msg: error });
        
    }
}

module.exports = {
  addUser,
  addProfile,
  getUsers,
  updateProfile,
  deleteProfile,
  searchUser
};
