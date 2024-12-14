function processProducts(products) {
    const productNames = products.map(product => product.name);
    products.forEach(product => {
        console.log(`${product.name} is ${product.price > 50 ? "above" : "below"} $50`);
    });
}
processProducts([{ name: "Laptop", price: 1000 }, { name: "Mouse", price: 20 }]);
