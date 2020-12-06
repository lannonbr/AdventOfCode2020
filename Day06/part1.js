const fs = require("fs");
const path = require("path");

const sum = (a, b) => a + b;

// Sum of number of questions anyone in each group answered yes to
const answer = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n\n")
  .map((group) => group.split("\n").join("").split("")) // Map over each group to an array of only alphabetical characters
  .map((group) => new Set(group).size) // throw the characters into a Set to remove duplicates and get the size
  .reduce(sum);

console.log(answer);
