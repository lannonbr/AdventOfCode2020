const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let x_wrap = lines[0].length;

let x = 0;
let y = 0;

// Used a JS Generator to lazily create the sequence of [x,y] locations one would hit with the provided slope
function* sequence() {
  let x = 0;
  let y = 0;

  while (true) {
    x += 3;
    y += 1;
    yield [x, y];
  }
}

const seq = sequence();
let trees = 0;

for (let i = 0; i < lines.length - 1; i++) {
  let [x, y] = seq.next().value;

  let char = lines[y][x % x_wrap];

  if (char === "#") {
    trees++;
  }
}

console.log(trees);
