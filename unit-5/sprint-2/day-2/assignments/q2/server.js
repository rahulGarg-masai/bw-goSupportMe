const express = require("express");
const app = express();
const port = 3000;

app.get('/users/get',(req,res)=>{
    let data = {
        'id':"1",
        'name':'raj',
        'age':20
    }
    res.send(data);
})

app.get('/users/list',(req,res)=>{
     let data = [
        {
        'id':"1",
        'name':'raj',
        'age':20
     },
{
    'id':"2",
        'name':'raju',
        'age':21
},
{
    'id':"3",
        'name':'rajesh',
        'age':22
},
     ]
     res.send(data);
})

app.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port,()=>{
    console.log(`server running on ${port}`);
    
})