let n = 5;
for (let i = 0; i < n; i++) {
  if (i == 0 || i == n - 1) {
    console.log("*".repeat(n)); 
  } else {
    console.log("*"); 
  }
}
