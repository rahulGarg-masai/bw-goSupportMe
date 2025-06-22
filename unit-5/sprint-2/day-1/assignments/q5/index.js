const express = require("express");
const app = express();
const port = 3003;
const myEmitter = require('./eventLogger')
const delay     = require("./delay");

app.get('/test',(req,res)=>{
    res.send('test route running fine')
})

app.get('/emit',(req,res)=>{
    const timestamp  = new Date().toISOString();
   myEmitter.emit('event',timestamp);
   res.send(`event occured at ${timestamp}`)
   
})

app.get('/delay', async (req,res)=>{
    try{
        const result = await delay('hello',2000);
        res.send(result);
    }
    catch(error){
        res.send(error);
    }
});

app.listen(port , ()=>{
    console.log(`server running on port ${port}`);
})