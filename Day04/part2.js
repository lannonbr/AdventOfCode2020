const fs = require("fs");
const path = require("path");

const passports = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n\n");

const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

function isValidPassport(passport) {
  let fields = passport.split("\n").join(" ").split(" ");

  let keys = fields.map((f) => f.split(":")).map(([key, val]) => key);

  if (keys.length < validFields.length) {
    return false;
  } else if (keys.length === validFields.length && keys.includes("cid")) {
    return false;
  } else {
    return validateFields(fields);
  }
}

function validateFields(fields) {
  for (let field of fields) {
    let [fieldName, val] = field.split(":");

    switch (fieldName) {
      case "byr": // Birth year
        if (
          val.length === 4 &&
          parseInt(val) >= 1920 &&
          parseInt(val) <= 2002
        ) {
          continue;
        } else {
          return false;
        }
      case "iyr": // Issue year
        if (
          val.length === 4 &&
          parseInt(val) >= 2010 &&
          parseInt(val) <= 2020
        ) {
          continue;
        } else {
          return false;
        }
      case "eyr": // Expiration year
        if (
          val.length === 4 &&
          parseInt(val) >= 2020 &&
          parseInt(val) <= 2030
        ) {
          continue;
        } else {
          return false;
        }
      case "hgt": // Height
        if (val.endsWith("in") || val.endsWith("cm")) {
          let num = parseInt(val.slice(0, -2));
          if (val.endsWith("in") && num >= 59 && num <= 76) {
            continue;
          } else if (val.endsWith("cm") && num >= 150 && num <= 193) {
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      case "hcl": // Hair color
        if (
          val.length === 7 &&
          val[0] === "#" &&
          val
            .slice(1)
            .split("")
            .every((c) => {
              return c.match(/[a-f]|[0-9]/i);
            })
        ) {
          continue;
        } else {
          return false;
        }
      case "ecl": // Eye color
        if (validEyeColors.includes(val)) {
          continue;
        } else {
          return false;
        }
      case "pid": // Passport ID
        if (val.length === 9 && !isNaN(val)) {
          continue;
        } else {
          return false;
        }
      case "cid":
        continue;
    }
  }

  return true;
}

let answer = passports.filter((passport) => isValidPassport(passport)).length;

console.log("Valid passports: " + answer);
