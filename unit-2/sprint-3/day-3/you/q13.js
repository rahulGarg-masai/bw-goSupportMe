function filterEvenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
  }
  
  function sumOfArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
  }
  
  function sortAndConcat(arr1, arr2) {
    const sortedArr1 = [...arr1].sort((a, b) => a - b);
    const sortedArr2 = [...arr2].sort((a, b) => a - b);
    return sortedArr1.concat(sortedArr2);
  }
  
  const arr1 = [5, 2, 8, 1];
  const arr2 = [3, 7, 4, 6];
  
  console.log(filterEvenNumbers(arr1));
  console.log(sumOfArray(arr1));
  console.log(sortAndConcat(arr1, arr2));