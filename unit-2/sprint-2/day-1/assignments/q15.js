let orders = [
    "1001: Alice",
    "1002: Bob",
    "1003: Charlie",
    "1004: Diana",
    "1005: Edward"
  ];
   let newOrders = ["1006: Fiona", "1007: George", "1008: Helen"];
  orders.length += newOrders.length; 
  for (let i = orders.length - 1; i >= newOrders.length; i--) {
    orders[i] = orders[i - newOrders.length]; 
  }
  for (let i = 0; i < newOrders.length; i++) {
    orders[i] = newOrders[i]; 
  }
  orders.length -= 2; 
  function processOrders(orderQueue) {
    for (let i = 0; i < orderQueue.length; i++) {
      let order = orderQueue[i];
      let separatorIndex = order.indexOf(": "); 
      let orderID = order.slice(0, separatorIndex); 
      let customerName = order.slice(separatorIndex + 2); 
      console.log(`Processing ${orderID} for ${customerName}`);
    }
  }
  processOrders(orders);
  console.log("Final Queue (Unprocessed Orders):", orders);
  let longestName = "";
  for (let i = 0; i < orders.length; i++) {
    let customerName = orders[i].slice(orders[i].indexOf(": ") + 2);
    if (customerName.length > longestName.length) {
      longestName = customerName;
    }
  }
  console.log(`Customer with the longest name is: ${longestName}`);
  