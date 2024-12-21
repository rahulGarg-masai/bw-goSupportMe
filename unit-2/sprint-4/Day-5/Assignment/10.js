// Base class: User
class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
    getDetails() {
      console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
  }
  
  // Student class that inherits from User
  class Student extends User {
    constructor(name, email, studentId) {
      super(name, email); // Call the parent class constructor
      this.studentId = studentId;
    }
  
    enroll() {
      console.log(`Student ${this.name} has enrolled.`);
    }
  }
  
  // Instructor class that inherits from User
  class Instructor extends User {
    constructor(name, email, instructorId) {
      super(name, email); // Call the parent class constructor
      this.instructorId = instructorId;
    }
  
    assignGrade() {
      console.log(`Instructor ${this.name} assigned a grade.`);
    }
  }
  
  // Demonstration
  // Create an instance of Student
  const student = new Student("Alice", "alice@example.com", "S12345");
  student.getDetails();
  student.enroll();
  
  // Create an instance of Instructor
  const instructor = new Instructor("Bob", "bob@example.com", "I67890");
  instructor.getDetails();
  instructor.assignGrade();
  