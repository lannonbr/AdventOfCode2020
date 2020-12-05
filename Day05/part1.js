const fs = require("fs");
const path = require("path");

const seats = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

function getSeatID(str) {
  let rowRange = [0, 127];

  for (let i = 0; i < 7; i++) {
    let halfSize = (rowRange[1] + 1 - rowRange[0]) / 2;

    if (str[i] === "F") {
      rowRange[1] -= halfSize;
    }
    if (str[i] === "B") {
      rowRange[0] += halfSize;
    }
  }

  let row = rowRange[0];

  let colRange = [0, 7];

  for (let i = 7; i < 10; i++) {
    let halfSize = (colRange[1] + 1 - colRange[0]) / 2;

    if (str[i] === "L") {
      colRange[1] -= halfSize;
    }
    if (str[i] === "R") {
      colRange[0] += halfSize;
    }
  }

  let col = colRange[0];

  return row * 8 + col;
}

let filledSeats = seats.map((seat) => getSeatID(seat));

console.log(Math.max(...filledSeats));
