const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((a) => Number(a));

input.sort((a, b) => a - b);

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    if (i !== j) {
      if (input[i] + input[j] === 2020) {
        console.log(`The numbers were ${input[i]} and ${input[j]}`);
        console.log(`${input[i]} * ${input[j]} = ${input[i] * input[j]}`);
        return;
      }
    }
  }
}
