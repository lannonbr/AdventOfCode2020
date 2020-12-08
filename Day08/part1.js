const fs = require("fs");
const path = require("path");

let instructions = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

instructions = instructions.map((instruction) => {
  let [op, val] = instruction.split(" ");
  val = parseInt(val);

  return { op, val };
});

let pointer = 0;
let accumulator = 0;

let visitedLocations = new Set();

while (true) {
  visitedLocations.add(pointer);

  switch (instructions[pointer].op) {
    case "acc":
      accumulator += instructions[pointer].val;
      pointer++;
      break;
    case "jmp":
      pointer += instructions[pointer].val;
      break;
    case "nop":
      pointer++;
      break;
  }

  if (visitedLocations.has(pointer)) {
    console.log("Accumulator: ", accumulator);
    return;
  }
}
