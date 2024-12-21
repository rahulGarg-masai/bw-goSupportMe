class Car {
    constructor(make, model, year, isAvailable = true) {
      this.make = make;
      this.model = model;
      this.year = year;
      this.isAvailable = isAvailable;
    }
  }
  
  class Customer {
    constructor(name) {
      this.name = name;
      this.rentedCars = [];
    }
  
    rentCar(car) {
      if (car.isAvailable) {
        car.isAvailable = false;
        this.rentedCars.push(car);
      } else {
        console.log(`Car ${car.make} ${car.model} is already rented.`);
      }
    }
  
    returnCar(car) {
      car.isAvailable = true;
      this.rentedCars = this.rentedCars.filter((rentedCar) => rentedCar !== car);
      setTimeout(() => {
        console.log(`Car ${car.make} ${car.model} has been returned.`);
      }, 2000);
    }
  }
  
  class PremiumCustomer extends Customer {
    constructor(name, discountRate) {
      super(name);
      this.discountRate = discountRate;
    }
  }
  
  function calculateRentalPrice(carType, isPremiumCustomer, baseRate = 50) {
    let rateMultiplier = 1;
    if (carType === "SUV") rateMultiplier = 1.5;
    if (carType === "Sedan") rateMultiplier = 1.2;
    if (isPremiumCustomer) rateMultiplier *= 0.9;
    return baseRate * rateMultiplier;
  }
  
  function Maintenance(car) {
    setTimeout(() => {
      car.isAvailable = true;
      console.log(`Car ${car.make} ${car.model} is now maintained and available.`);
    }, 3000);
  }
  
  