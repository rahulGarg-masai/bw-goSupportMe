function inventoryManagement(products) {
    return products
        .filter(product => product.stock < 100)
        .map(product => ({
            category: product.category,
            reorderCost: product.pricePerUnit * (100 - product.stock)
        }))
        .reduce((acc, { category, reorderCost }) => {
            acc[category] = (acc[category] || 0) + reorderCost;
            return acc;
        }, {})
}

const products = [
    { name: "Laptop", category: "Electronics", stock: 50, pricePerUnit: 1000 },
    { name: "Phone", category: "Electronics", stock: 150, pricePerUnit: 500 },
    { name: "T-shirt", category: "Clothing", stock: 40, pricePerUnit: 20 },
    { name: "Jeans", category: "Clothing", stock: 90, pricePerUnit: 40 },
    { name: "Watch", category: "Accessories", stock: 70, pricePerUnit: 150 }
];

const result = inventoryManagement(products);
console.log(
    Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
);
