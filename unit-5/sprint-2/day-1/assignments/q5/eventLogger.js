const {EventEmitter} = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (param) => {
  console.log(`an event occured ${param}`);
  
});
module.exports = myEmitter;