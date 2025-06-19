const fs = require('fs').promises;

async function read(filepath){
    try{
        let data = await fs.readFile(filepath,'utf8');
        return data;
    }
    catch(error){
        console.log(error.message);
        throw error;
    }
}
module.exports={read};