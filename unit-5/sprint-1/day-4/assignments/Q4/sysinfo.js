const { log } = require('console');
const os = require('os');

function getSystemInfo(){
    console.log("system information");
    console.log('--------------------');
    console.log(`architecture ${os.arch()}`);
    console.log(`cpu cores ${os.cpus().length}`);
    const cpus = os.cpus();//cpus is object
    console.log(`cpu model ${cpus[0].model}`)
    console.log(`cpu speed ${cpus[0].speed}`);
    console.log(`free memory ${Math.floor(os.totalmem()/Math.pow(10,9))} GB`);

    console.log(`free memory ${Math.floor(os.freemem()/Math.pow(10,9))} GB`);
const heapUsage = process.memoryUsage();
    console.log(`Heap Used: ${(heapUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(heapUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`hostname: ${os.hostname()}`);
console.log(`host type : ${os.type()}`);

    
}


module.exports = {getSystemInfo};