const express = require("express");
const app = express();
const port = 3000;

app.get("/home",(req,res)=>{
    res.send("This is home page ")
});
app.get('/contactus',(req,res)=>{
    res.send('contact us at contact@contact.com');
});
app.get('/about',(req,res)=>{
    res.send("this is about us ")
});

app.listen(port, ()=>{
    console.log(`server started on port number ${port}`);
})