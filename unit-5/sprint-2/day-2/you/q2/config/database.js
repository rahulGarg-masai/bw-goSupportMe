const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/taskDB");
        console.log('connected to db');
        
    }catch(err){
        console.log(`error connecting to db ${err}`);

    }

}
module.exports = connectDB;