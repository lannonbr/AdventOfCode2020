const fs = require("fs");
const path = require("path");

let lines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let buses = lines[1]
  .split(",")
  .map((num, idx) => ({ num, idx }))
  .filter(({ num }) => num !== "x")
  .map(({ num, idx }) => ({ num: parseInt(num), idx }));

let earliestTime = 0;
let prod = 1;

// for each item, find where the pattern plus the offset is a multiple of the bus id.
for (let i = 0; i < buses.length; i++) {
  while ((earliestTime + buses[i].idx) % buses[i].num !== 0) {
    earliestTime += prod;
  }
  prod *= buses[i].num;
}

console.log(earliestTime);
