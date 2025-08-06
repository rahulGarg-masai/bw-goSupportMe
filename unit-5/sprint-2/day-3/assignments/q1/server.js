const express= require("express");
const connectDB = require("./config/database");
const UserRouter = require("./routes/user.route");

connectDB();
const app = express();
app.use(express.json());
app.get('/test',(req,res)=>{
    console.log('test route');
})
app.use('users',UserRouter);
app.listen(3000,()=>{
    console.log('server started....');
    
})