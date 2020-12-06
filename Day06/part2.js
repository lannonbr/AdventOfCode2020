const fs = require("fs");
const path = require("path");

const sum = (a, b) => a + b;

// Sum of number of questions everyone in each group answered yes to
let answer = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n\n")
  .map((group) => {
    let people = group.split("\n");

    // get number of characters in first person's listing that are in
    // every other person's listings as well
    let unanimousCount = people[0]
      .split("")
      .filter((character) =>
        people.every((otherPerson) => otherPerson.includes(character))
      ).length;

    return unanimousCount;
  })
  .reduce(sum);

console.log(answer);
