// Person Constructor Function
function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Adding introduce method to Person prototype
  Person.prototype.introduce = function() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
  };
  
  // Employee Constructor Function
  function Employee(name, age, jobTitle) {
    Person.call(this, name, age); // Call the Person constructor
    this.jobTitle = jobTitle;
  }
  
  // Inherit Person prototype
  Employee.prototype = Object.create(Person.prototype);
  Employee.prototype.constructor = Employee;
  
  // Adding work method to Employee prototype
  Employee.prototype.work = function() {
    console.log(`${this.name} is working as a ${this.jobTitle}.`);
  };
  
  // Demonstration
  // Create an instance of Person
  const person = new Person("Alice", 30);
  person.introduce();
  
  // Create an instance of Employee
  const employee = new Employee("Bob", 40, "Software Engineer");
  employee.introduce();
  employee.work();
  