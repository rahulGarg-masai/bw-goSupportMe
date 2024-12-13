function modifyAndMerge(arr1, arr2) {
    let modifiedArr1 = [...arr1];
    modifiedArr1.splice(1, 1, "bus", "scooter");
    return modifiedArr1.concat(arr2);
  }
  
  const arr1 = ["car", "bike", "train"];
  const arr2 = ["plane", "ship"];
  console.log(modifyAndMerge(arr1, arr2));