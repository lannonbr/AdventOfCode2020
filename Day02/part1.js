const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

function parseLine(line) {
  let [range, char, password] = line.split(" ");

  char = char[0];

  const [min, max] = range.split("-").map((a) => parseInt(a));

  let passArray = password.split("");

  return [min, max, char, passArray];
}

function isValidPassword(passArray, min, max) {
  return passArray.length >= min && passArray.length <= max;
}

let validPasswords = lines.filter((line) => {
  let [min, max, char, passArray] = parseLine(line);

  // Filter down the array to just the single character we care about
  passArray = passArray.filter((character) => character === char);

  return isValidPassword(passArray, min, max);
}).length;

console.log("Valid passwords: " + validPasswords);
