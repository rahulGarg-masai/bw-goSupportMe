function factorial(n) {
    if (typeof n !== "number" || n < 0) {
        console.log("Invalid input");
        return;
    }
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

// Test cases
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
console.log(factorial(-3)); // Output: "Invalid input"
console.log(factorial("text")); // Output: "Invalid input"
