const fs = require("fs");
const path = require("path");

let lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let startTimestamp = +lines[0];
let buses = lines[1]
  .split(",")
  .filter((busNum) => busNum !== "x")
  .map((num) => parseInt(num));

// get the floor of the start timestamp for each number,
// so if you increment each once we will have the min be past the startTimestamp
let start = buses.map((bus) => {
  return bus * Math.floor(startTimestamp / bus);
});

let newState = start.map((bus, i) => {
  return bus + buses[i];
});

const min = Math.min(...newState);

let id = buses[newState.findIndex((bus) => bus === min)];
let diff = min - startTimestamp;

console.log(id * diff);
