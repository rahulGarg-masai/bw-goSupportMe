let price = 750; 

let category = price < 0 
                ? "Invalid Price" 
                : price === 0 
                ? "Free" 
                : price < 500 
                ? "Affordable" 
                : price <= 999 
                ? "Moderate" 
                : "Expensive";

console.log(category);
