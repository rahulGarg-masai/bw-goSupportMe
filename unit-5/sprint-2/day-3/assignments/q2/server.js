const express = require("express");
const connectDB = require("./config/database");
const UserRouter = require("./routes/user.routes");

connectDB();
const app = express();

app.use(express.json());
app.use('users',UserRouter);
app.get('/test',()=>{
    console.log('test route running fine');
    
})

app.listen(3000,()=>{
    console.log('server started on port 3000');
    
})