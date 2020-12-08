const fs = require("fs");
const path = require("path");

let rules = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

rules = rules.map((rule) => {
  let [color, contents] = rule.split("contain");
  color = color.split(" bags")[0];

  contents = contents
    .trim()
    .split(", ")
    .map((item) => {
      return {
        number: parseInt(item.split(" ")[0]),
        color: item.split(" ").slice(1).join(" ").split(" bag")[0],
      };
    });
  return { color, contents };
});

let map = {};

rules.forEach((rule) => {
  if (isNaN(rule.contents[0].number)) {
    map[rule.color] = [];
  } else {
    map[rule.color] = {
      visited: false,
      contents: rule.contents,
    };
  }
});

function visit(key) {
  let count = 0;
  for (let content of map[key].contents) {
    count += content.number;
    if (map[content.color].contents !== undefined) {
      count += content.number * visit(content.color);
    }
  }
  return count;
}

let count = 0;

count += visit("shiny gold");

console.log(count);
