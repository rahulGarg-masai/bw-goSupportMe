const {readFileData,appendFileData} = require('./fileOperations');

(async ()=>{
    await readFileData('./data.txt');
    await appendFileData('./data.txt','appended data');
    await readFileData('./data.txt');
})();