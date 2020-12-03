const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let x_wrap = lines[0].length;

// Used a JS Generator to lazily create the sequence of [x,y] locations one would hit with the provided slope
function* sequence(xSlope, ySlope) {
  let x = 0;
  let y = 0;

  while (true) {
    x += xSlope;
    y += ySlope;
    yield [x, y];
  }
}

function runSlope(xSlope, ySlope) {
  const seq = sequence(xSlope, ySlope);
  let trees = 0;

  for (let i = 0; i < lines.length - 1; i++) {
    let [x, y] = seq.next().value;

    if (y > lines.length) {
      break;
    }

    let char = lines[y][x % x_wrap];

    if (char === "#") {
      trees++;
    }
  }

  return trees;
}

let slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

slopes = slopes.map(([xSlope, ySlope]) => {
  return runSlope(xSlope, ySlope);
});

console.log(
  slopes.reduce((acc, val) => {
    return acc * val;
  }, 1)
);
