let obj ={name:'raju'};
function setTimeoutGreet(){
    console.log( "Hello " + this.name);
    return;
 }
 let ans = setTimeoutGreet.bind(obj);
 setTimeout(ans,'1000');
