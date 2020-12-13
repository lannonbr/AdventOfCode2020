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

// for instance, say we have [3, 5, 7]

// Step1:
//   We'd first find the multiple of 3 starting with 0 with offset of 0, it would end up being 0.
// Step2:
//   Increment starting at 0 by 3 (3)
//   Then we would find increments of 5 where the multiple of 3 is 1 off of it. That ends up
//   being 10 so buses[0] would be 9.
// Step3:
//   Increment starting at 9 by 15 (3 * 5)
//   Then we would find increments of 7 where the multiple of 5 is one off of it and the multiple of 3
//   is one off that. That ends up being 56, so buses[0] would be two off being 54 and since that is
//   the last number, that is the answer.
for (let i = 0; i < buses.length; i++) {
  while ((earliestTime + buses[i].idx) % buses[i].num !== 0) {
    earliestTime += prod;
  }
  prod *= buses[i].num;
}

console.log(earliestTime);
