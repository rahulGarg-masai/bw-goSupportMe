function fetchDataWithCallback(callback) {
    setTimeout(() => {
      const success = Math.random() > 0.5; 
      if (success) {
        callback(null, "Data fetched successfully");
      } else {
        callback("Error fetching data", null);
      }
    }, 1000);
  }
  
  fetchDataWithCallback((error, data) => {
    if (error) {
      console.log("Error fetching data");
    } else {
      console.log(data);
    }
  });
  