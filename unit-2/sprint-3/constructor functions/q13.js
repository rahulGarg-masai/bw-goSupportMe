function createInventoryItem(name,category,price){
let obj={};
obj.name = name;
obj.category=category;
obj.price=price;
obj.describeItem=function(){
    console.log(this.name+this.category+this.price);
}
return obj;
}
function addItemDiscount(item,discountPercent){
let obj ={};
obj.item = item;
obj.discountPercent=discountPercent;
obj.discountedPrice = item.price *(100-discountPercent)/100;
obj.applyDiscount = function(){
    console.log(this.discountedPrice);
}
return obj;
}

const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem();
// Output: Item: Laptop, Category: Electronics, Price: 1500

const discountedItem = addItemDiscount(item, 10);
discountedItem.applyDiscount();
// Output: Discounted Price for Laptop: 1350
