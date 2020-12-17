const fs = require("fs");
const path = require("path");

let [validityRequirements, myTicket, nearbyTickets] = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n\n");

let validNumbers = {};

validityRequirements.split("\n").forEach((line) => {
  let matches = line.match(/(\d+\-\d+)/g);
  matches = matches.map((match) =>
    match.split("-").map((matchHalf) => parseInt(matchHalf))
  );

  matches.forEach((match) => {
    for (let i = match[0]; i < match[1] + 1; i++) {
      validNumbers[i] = "1";
    }
  });
  // console.log(matches);
});

validNumbers = Object.keys(validNumbers).map((num) => parseInt(num));

let sum = 0;

nearbyTickets
  .split("\n")
  .slice(1)
  .forEach((nums_) => {
    let nums = nums_.split(",").map((num) => parseInt(num));
    for (let i = 0; i < nums.length; i++) {
      if (!validNumbers.includes(nums[i])) {
        sum += nums[i];
      }
    }
  });

console.log(sum);
