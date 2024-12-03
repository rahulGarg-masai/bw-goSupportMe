let scores = [35, 50, 78, 92, 45, 89, 30, 95, 60, 40];
let passedCount = 0;
for (let i = 0; i < scores.length; i++) {
  if (scores[i] < 40) {
    scores[i] += 20;
  }
  if (scores[i] > 90) {
    scores[i] = 90;
  }
  if (scores[i] >= 50) {
    passedCount++;
  }
}
console.log("Final Adjusted Scores:", scores);
console.log("Number of Students Passed:", passedCount);
