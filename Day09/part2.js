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
      return [i, numbers[i]];
    }
  }
}

function findContiguousSet(numbers, sumNum) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      let slice = numbers.slice(i, j + 1);

      sum = slice.reduce((a, b) => a + b);
      if (sum === sumNum) {
        return slice;
      }
    }
  }
}

const [idx, invalidNumber] = findInvalidNumber(numbers, 25);
let set = findContiguousSet(numbers.slice(0, idx), invalidNumber);
set.sort();

console.log(set[0] + set[set.length - 1]);
