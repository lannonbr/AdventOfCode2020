const fs = require("fs");
const path = require("path");

let directions = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let waypointX = 10;
let waypointY = 1;

let x = 0;
let y = 0;

directions.forEach((direction) => {
  const val = +direction.slice(1);
  let deg = val / 90;

  switch (direction[0]) {
    case "N":
      waypointY += val;
      break;
    case "S":
      waypointY -= val;
      break;
    case "E":
      waypointX += val;
      break;
    case "W":
      waypointX -= val;
      break;
    case "L":
      while (deg) {
        [waypointX, waypointY] = [-waypointY, waypointX];
        deg--;
      }
      break;
    case "R":
      while (deg) {
        [waypointX, waypointY] = [waypointY, -waypointX];
        deg--;
      }
      break;
    case "F":
      x += val * waypointX;
      y += val * waypointY;
      break;
  }
});

console.log("Final Location:", x, y);
console.log("Distance:", Math.abs(x) + Math.abs(y));
