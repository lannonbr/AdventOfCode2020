const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

function parseLine(line) {
  let [range, char, password] = line.split(" ");

  char = char[0];

  // Subtract 1 from each number as JS is 0-indexed, while these are 1-indexed
  const [min, max] = range.split("-").map((a) => parseInt(a) - 1);

  let passArray = password.split("");

  return [min, max, char, passArray];
}

function isValidPassword(passArray, char) {
  return (passArray[0] === char) ^ (passArray[1] === char);
}

let validPasswords = lines.filter((line) => {
  let [one, two, char, passArray] = parseLine(line);

  // Filter down each array to the values at index "one" and "two"
  passArray = [passArray[one], passArray[two]];

  // If [0] is char or [1] is char but [0] and [1] are not the same, then the password is valid
  return isValidPassword(passArray, char);
}).length;

console.log("Valid passwords: " + validPasswords);
