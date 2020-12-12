const fs = require("fs");
const path = require("path");

let directions = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let faces = ["N", "E", "S", "W"];

let dirParse = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

let x = 0;
let y = 0;
let dir = "E";
let dirIdx = 1;

directions.forEach((direction) => {
  const val = +direction.slice(1);
  const deg = val / 90;

  switch (direction[0]) {
    case "N":
      y += val;
      break;
    case "S":
      y -= val;
      break;
    case "E":
      x += val;
      break;
    case "W":
      x -= val;
      break;
    case "L":
      dirIdx += 4 - deg;
      dir = faces[dirIdx % 4];
      break;
    case "R":
      dirIdx += deg;
      dir = faces[dirIdx % 4];
      break;
    case "F":
      x += dirParse[dir].x * val;
      y += dirParse[dir].y * val;
      break;
  }
});

console.log("Final Location:", x, y);
console.log("Distance:", Math.abs(x) + Math.abs(y));
