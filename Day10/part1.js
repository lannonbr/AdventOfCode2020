const fs = require("fs");
const path = require("path");

let numbers = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((number) => parseInt(number));

// let numbers = `16
// 10
// 15
// 5
// 1
// 11
// 7
// 19
// 6
// 12
// 4`
//   .split("\n")
//   .map((number) => parseInt(number));

numbers.sort((a, b) => a - b);

let startVoltage = 0;

let diffs = numbers.map((number, i) => {
  if (i - 1 >= 0) {
    return number - numbers[i - 1];
  } else {
    return number;
  }
});

console.log(numbers);
console.log(diffs);

const ones = diffs.filter((num) => num === 1);
const threes = diffs.filter((num) => num === 3);

threes.push(3);

console.log(ones.length, threes.length, diffs.length);

console.log(ones.length * threes.length);
