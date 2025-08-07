const mongoose = require("mongoose");
const { UserModel, ProfileModel } = require("../models/user.model");

const addUser = async (req, res) => {
  try {
    let user = await UserModel.create(req.body);
    res.status(201).json({ msg: "user added", user });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const addProfile = async (req, res) => {
  try {
    const { user, bio, socialMediaLinks } = req.body;
    const userExists = await UserModel.findById(user);
    if (!userExists) {
      return res.status(400).json({ error: "user not found" });
    }
    //check if user is already mapped to a profile or not (to maintain 1-1 relationship)
    const existingProfile = await ProfileModel.findOne({ user: user }); //findOne gets the first matching document
    if (existingProfile) {
      //profile already associated to a user
      return res
        .status(400)
        .json({ msg: "profile already associated with another user" });
    } else {
      const newProfile = await ProfileModel.create({
        user: user,
        socialMediaLinks: socialMediaLinks,
        bio: bio,
      });
      return res.status(201).json({ msg: "profile mapped", newProfile });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate("user");
    res.status(200).json({ msg: "here are all the profiles", profiles });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = { addUser, addProfile, getAllProfiles };
