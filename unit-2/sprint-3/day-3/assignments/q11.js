function extractAndReverse(arr) {
    let subArray = arr.slice(2, 5);
    return subArray.reverse();
}

const array = [15, 30, 45, 60, 75, 90];
console.log(extractAndReverse(array)); 