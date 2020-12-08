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
      containShinyGold: false,
    };
  }
});

let containsGoldCount = 0;

for (const key of Object.keys(map)) {
  if (map[key].contents !== undefined && !map[key].visited) {
    visit(key);
  }
}

function visit(key) {
  map[key].visited = true;

  const hasShinyGold =
    map[key].contents.filter((content) => content.color === "shiny gold")
      .length > 0;

  if (hasShinyGold) {
    map[key].containShinyGold = true;
    containsGoldCount++;
  }

  for (let content of map[key].contents) {
    if (
      map[content.color].contents !== undefined &&
      !map[content.color].visited
    ) {
      visit(content.color);
    }

    if (
      map[content.color].visited &&
      map[content.color].containShinyGold &&
      !map[key].containShinyGold
    ) {
      map[key].containShinyGold = true;
      containsGoldCount++;
    }
  }
}

console.log(containsGoldCount);
