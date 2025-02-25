function createInventoryItem(name,category,price){
let obj ={};
obj.name=name;
obj.category=category;
obj.price=price;
obj.describeItem = function(){
return console.log(this.name+this.category+this.price);
}
return obj;
}

function addItemDiscount(obj,discountPercent){
let obj1={};
obj1.discountPercent=discountPercent;
obj1.discountedPrice = (obj.price * (100-discountPercent))/100;
obj1.applyDiscount = function(){
    return console.log(this.discountedPrice);
}
return obj1;
}
const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem();
// Output: Item: Laptop, Category: Electronics, Price: 1500

const discountedItem = addItemDiscount(item, 10);
//console.log(discountedItem.discountedPrice);
discountedItem.applyDiscount();
// // Output: Discounted Price for Laptop: 1350
