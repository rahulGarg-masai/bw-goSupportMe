function Product(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  
  Product.prototype.updateQuantity = function (amount) {
    this.quantity += amount;
  };
  
  Product.prototype.displayInfo = function () {
    return `${this.name}: $${this.price}, Quantity: ${this.quantity}`;
  };
  
  function Electronics(name, price, quantity, brand, model) {
    Product.call(this, name, price, quantity);
    this.brand = brand;
    this.model = model;
  }
  
  Electronics.prototype = Object.create(Product.prototype);
  Electronics.prototype.constructor = Electronics;
  
  Electronics.prototype.powerOn = function () {
    console.log(`${this.name} is now ON.`);
  };
  
  Electronics.prototype.powerOff = function () {
    console.log(`${this.name} is now OFF.`);
  };
  
  function Clothing(name, price, quantity, size, material) {
    Product.call(this, name, price, quantity);
    this.size = size;
    this.material = material;
  }
  
  Clothing.prototype = Object.create(Product.prototype);
  Clothing.prototype.constructor = Clothing;
  
  Clothing.prototype.displaySize = function () {
    return `${this.name} is available in size: ${this.size}`;
  };
  
  function Book(name, price, quantity, author, genre) {
    Product.call(this, name, price, quantity);
    this.author = author;
    this.genre = genre;
  }
  
  Book.prototype = Object.create(Product.prototype);
  Book.prototype.constructor = Book;
  
  Book.prototype.getAuthor = function () {
    return `Author of ${this.name}: ${this.author}`;
  };
  
  