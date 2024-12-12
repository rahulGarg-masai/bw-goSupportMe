function outerFunction() {
    
    const message = "Hello, this is a closure example!";

   
    return function innerFunction() {
        console.log(message); 
    };
}


const storedFunction = outerFunction(); 
storedFunction();