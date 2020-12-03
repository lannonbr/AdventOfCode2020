const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((a) => Number(a));

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    for (let k = 0; k < input.length; k++) {
      if (i !== j && j !== k) {
        if (input[i] + input[j] + input[k] === 2020) {
          console.log(
            `The numbers were ${input[i]} and ${input[j]} and ${input[k]}`
          );
          console.log(
            `${input[i]} * ${input[j]} * ${input[k]} = ${
              input[i] * input[j] * input[k]
            }`
          );
          return;
        }
      }
    }
  }
}
