function createEmployee(name,role,salary){
    let obj={};
obj.name = name;
obj.role= role;
obj.salary=salary;
obj.introduce = function(){
    console.log(`hello this is ${this.name} working as ${this.role}`);
}
return obj;
}

const employee1 = createEmployee("Alice", "Developer", 60000);
employee1.introduce();
// Output: Hello, I am Alice, working as a Developer.
