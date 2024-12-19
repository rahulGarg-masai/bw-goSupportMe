function createCar(make, model, year) {
    return {
      make: make,
      model: model,
      year: year,
      describeCar: function () {
        console.log(`This car is a ${year} ${make} ${model}.`);
      },
    };
  }
 