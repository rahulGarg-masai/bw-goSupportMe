for (let i = 0; i < N; i++) {
    let row = "";
    for (let j = 0; j < M; j++) {
      row += (i + j) + " ";
    }
    console.log(row.trim());
  }
  