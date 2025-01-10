let N = 3; // Number of rows
let M = 2; // Number of columns
let arr = [
  [1, 2],
  [3, 4],
  [5, 6]
];

for (let i = 0; i < N; i++) {
  let rowResult = ""; // To store the elements of the current row
  for (let j = 0; j < M; j++) {
    rowResult += arr[i][j] + " "; // Add each element in the row to the result
  }
  console.log(rowResult.trim()); // Print the row and remove trailing space
}
