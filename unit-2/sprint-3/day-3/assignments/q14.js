function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];
    students.splice(1, 0, "David");
    console.log(students.includes("Eve"));
    console.log(students.join(","));
  }
  
  manageStudents();