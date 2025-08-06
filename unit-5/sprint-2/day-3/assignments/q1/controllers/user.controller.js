const mongoose = require("mongoose");
const { UserModel, AddressModel } = require("../models/user.model");

const addUser = async (req,res) => {
    try {
        const user = req.body;
        
            await UserModel.create(user);
            return res.status(201).json({msg:'user created',user});
        
    } catch (error) {
        res.status(400).json({error:error});
    }
}

const getUserData = async (req,res) => {
    let {userId} = req.params;
    try {
        let users  = await UserModel.findById(userId);
        res.status(200).json({msg:'all user data fetched',users});
    } catch (error) {
        res.status(400).json({error});
    }
}

const addAddress = async (req,res) => {
    try{
    let {userId} = req.params;
    //add a address for this user
    let user = await UserModel.findById(userId);
    if(!user){
        return res.status(404).json({msg:'user not found , dummy!'});
    }
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json({msg:'kardiya address add!'});
}catch(err){
    res.status(400).json({msg:'kuch galt hogya address add karne mein!!'});
}
}

const userSummary = async (req,res) => {
    try {
        const totalUsers = await UserModel.countDocuments();
        let users = await UserModel.find({},'name addresses');
        
        let totalAddresses = users.reduce((sum,user)=>sum+user.addresses.length,0);
        let userWithAddressCount = users.map(user=>({
            name:user.name,
            addressCount : user.addresses.length
        }));
        res.status(200).json({
            totalUsers,
            totalAddresses,
           users:  userWithAddressCount
        });


    } catch (error) {
        res.status(400).json({msg:'error while summarizing',error})
    }
}

module.exports = {addUser,getUserData,addAddress,userSummary};