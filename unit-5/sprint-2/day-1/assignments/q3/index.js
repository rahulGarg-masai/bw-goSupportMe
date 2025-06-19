const {read} = require('./read');
const os = require('os');
const dns = require('dns');
const express = require("express");
const app = express();
const port = 3001;

app.get('/test',(req,res)=>{
    res.send('test route is working')
});

app.get('/readfile', async (req,res) => {
try{
    const data = await read('./data.txt');
     res.send(data);
}
catch(error){
    res.send(error.message);
}
});

app.get('/systemdetails',(req,res)=>{
    let cpusinfo = os.cpus();
let obj = {
    'system platform': os.type(),
    'total memory': ` ${Math.floor(os.totalmem() / Math.pow(10,9))}GB`,
    'total free memory' : ` ${Math.floor(os.freemem() / Math.pow(10,9))}GB`,

    'cpu model' : cpusinfo[0].model,

}
res.send(obj);
})

app.get('/getip',(req,res)=>{
    dns.lookup('masaischool.com',(err,address,family)=>{
        if(err){
            return res.send(err.message);
        }
        res.send({address,family});
    })
})

app.listen(port,()=>{
    console.log(`port number ${port} is running `);
})