const mongoose = require("mongoose");
const { UserModel } = require("../../q1/models/user.model");

const addUser = async (req,res) => {
    try {
        let user = req.body;
        const existingUser = await UserModel.findOne({ email: user.email });
        if(existingUser){
            return res.status(400).json({ message: "Email already exists" });
        }
        else{
       const newUser =  await UserModel.create(user);
        return res.status(201).json(newUser);
    }
    } catch (error) {
        res.status(400).json({msg:error});
    }
}

const addProfile = async (req,res) => {
    try {
        const {userId} = req.params;
        let profile = req.body;
        const newProfile = await UserModel
    } catch (error) {
        res.status(400).json({msg:error});
        
    }
}

module.exports = {addUser};