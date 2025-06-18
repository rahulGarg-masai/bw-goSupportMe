//inbuilt modules , q1 q2 had custom module(we created the function ourselef - fact , prime )
//we use async function for 'fs' as big files can slow us if synchronous , fs will easily have 
//multiple files so async is obvious choice. 
const fs = require('fs').promises;
async function readFileData(filePath){
    try{
        const data = await fs.readFile(filePath,'utf8');
        console.log(data);
    }catch(error){
     console.log(error.message);
     throw error;
    }
}

async function appendFileData(filePath , data){
    try{
        await fs.appendFile(filePath,data,'utf8');
    }
    catch(error){
        console.log(error.message);
        throw error;
    }
}

module.exports = {readFileData , appendFileData};