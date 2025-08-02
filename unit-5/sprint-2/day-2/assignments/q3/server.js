const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.json());//we can provide raw data to body
//and this parses it to json and populates the body on req.body

app.get('/test',(req,res)=>{
    res.send('server running fine');
})

//1st add data - add done
 app.post('/add-dish',(req,res)=>{
    let newDish = req.body;
    let dishes = JSON.parse(fs.readFileSync('./db.json','utf8'));//dishes array
    dishes.push(newDish);
    fs.writeFileSync('./db.json',JSON.stringify(dishes));
    res.json({msg:'dish added'});
      });
 //2nd retreive all dishes , GET
 app.get('/get-dishes',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./db.json','utf8'));
    res.json({msg:'list of dishes',data});
 })     
//get from dishes id
 app.get('/get-dish/:id',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./db.json','utf8'));
let id = req.params.id;
let idx = data.find((ele)=>ele.id==id);
if(!idx){
    res.status(404).send('exact dish not found')
}
else {
    res.send(idx.name);
}
})

//get from dish name - get request is a READ REQUEST SO WE DONT UPDATE THE DB AT END
app.get('/get-dishesbyname',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./db.json','utf8'));
let name = req.query.name;
if(name.length!==0){
    let filteredDishes = data.filter((ele)=> ele.name===name
    );
    res.json({msg:`dishes with name found`,filteredDishes})
}
else {
res.status(404).send('not found');
}
})

//update dish by id -
app.put('/update-dish/:id',(req,res)=>{
    let id = req.params.id;
    let updatedDish = req.body;
    let data = JSON.parse(fs.readFileSync('./db.json','utf8'));
let idx = data.findIndex((dish)=>dish.id==id);
if(idx==-1){
res.status(404).json({msg:'dish not found'});
}
else {
    let updatedDishes = data.map((ele,i)=>{
        if(ele.id==id){
            return {...ele,...updatedDish}
        }
        else {
            return ele;
        }
    })
    data = updatedDishes;
    fs.writeFileSync('./db.json',JSON.stringify(data));
    res.send('dish updated');
}
})

app.delete('/delete-dish/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    let data = JSON.parse(fs.readFileSync('./db.json','utf8'));
    let idx = data.findIndex((ele)=>ele.id===id);
    
    if(idx===-1){
        res.status(404).send('not found ')
    }
    else {
        let updatedish = data.filter((ele,i)=>{
            return ele.id!==id;
        })
        data = updatedish;
        fs.writeFileSync('./db.json',JSON.stringify(data));
        res.send('dish deleted');
    }
})

app.listen(port,()=>{
    console.log(`server running on ${port}`);
    
})