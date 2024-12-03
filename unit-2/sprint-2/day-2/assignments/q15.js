let result = [];
for (let i = N - 1; i >= 0; i--) {
  result.push(matrix[i][0]);
}
for (let j = 1; j < N; j++) {
  result.push(matrix[0][j]);
}
for (let i = 1; i < N; i++) {
  result.push(matrix[i][N - 1]);
}
console.log(result.join(" "));
