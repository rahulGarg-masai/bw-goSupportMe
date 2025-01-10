let result = [];
for (let i=matrix.length-1;i>=0;i-- ){
    result.push(matrix[i][0]);
}
for(let i=1;i<matrix[0].length;i++){
    result.push(matrix[0][i]);
}
for (let i=1;i<matrix.length;i++){
    result.push(matrix[i][matrix[0].length-1]);
}
for (let i=matrix[0].length-2;i>=1;i--){
    result.push(matrix[matrix.length-1][i]);
}
console.log(result.join(" "));