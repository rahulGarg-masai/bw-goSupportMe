function personInfo(){
    
    console.log(this.name + ":" + this.age);
}
let obj = {name:'raju',age:10};
personInfo.call(obj);