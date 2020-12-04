const fs = require("fs");
const path = require("path");

const passports = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n\n");

function isValidPassport(passport) {
  const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  let fields = passport.split("\n").join(" ").split(" ");

  let keys = fields.map((f) => f.split(":")).map(([key, val]) => key);

  if (keys.length < validFields.length) {
    return false;
  } else if (keys.length === validFields.length && keys.includes("cid")) {
    return false;
  } else {
    return true;
  }
}

let answer = passports.filter((passport) => isValidPassport(passport)).length;

console.log("Valid passports: " + answer);
