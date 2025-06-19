const express = require("express");
const app = express();
const port = 3002;
const fileInfofun = require('./fileinfo');
const playwithurl  = require('./urlparser');
app.get('/test',(req,res)=>{
    res.send('this is test route for q4')
});

app.get('/parseurl',(req,res)=>{
    const urll = new URL('https://masaischool.com/course?name=backend&duration=6weeks')
    res.send(playwithurl(urll))
})

app.get('/fileinfo',(req,res)=>{
    res.send(fileInfofun('datafile.txt'))
})

app.listen(port , ()=>{
    console.log(`server running on port number ${port}`);
})