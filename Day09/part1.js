const fs = require("fs");
const path = require("path");

let numbers = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((number) => parseInt(number));

function arrayOverlap(array1, array2) {
  return array1.filter((array1Item) => array2.includes(array1Item));
}

function findInvalidNumber(numbers, prevSize) {
  for (let i = prevSize; i < numbers.length; i++) {
    let prevNumbers = numbers.slice(i - prevSize, i);

    let prevNumberDiffs = prevNumbers.map((prevNum) => {
      return numbers[i] - prevNum;
    });

    if (arrayOverlap(prevNumbers, prevNumberDiffs).length === 0) {
      return numbers[i];
    }
  }
}

console.log(findInvalidNumber(numbers, 25));
