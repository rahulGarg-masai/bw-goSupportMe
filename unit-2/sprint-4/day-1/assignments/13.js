let count = 0;
const loadingInterval = setInterval(() => {
  console.log("Loading...");
  count++;
  if (count === 5) {
    clearInterval(loadingInterval);
    console.log("Loaded successfully!");
  }
}, 1000);
