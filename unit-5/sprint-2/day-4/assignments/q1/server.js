const express = require("express");
const connectDB = require("./config/database");
const UserRouter = require("./routes/user.route");
const ProfileRouter = require("./routes/profile.route");


connectDB();
const app = express();
app.use(express.json());

app.use('User',UserRouter);
app.use('Profile',ProfileRouter);
app.listen(3000,()=>{
    console.log('server started');
    })