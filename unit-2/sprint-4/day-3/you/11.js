function createEmployee(name, role, salary) {
    return {
      name: name,
      role: role,
      salary: salary,
      introduce() {
        console.log(`Hello, I am ${this.name}, working as a ${this.role}.`);
      },
    };
  }
  
