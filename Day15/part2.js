let input = [15, 12, 0, 14, 3, 1];

let lastSeenArray = Array(30000000).fill(0);

for (let i = 0; i < input.length; i++) {
  lastSeenArray[input[i]] = i + 1;
}

let i = input.length;
let previousNumber = input[input.length - 1];

while (true) {
  let lastIdx = lastSeenArray[previousNumber];
  if (lastIdx !== 0) {
    let spokenNumber = i - lastIdx;
    lastSeenArray[previousNumber] = i;
    previousNumber = spokenNumber;
  } else {
    lastSeenArray[previousNumber] = i;
    previousNumber = 0;
  }
  i += 1;
  if (i === 2020 || i === 30000000) {
    console.log({ i, previousNumber });
    if (i === 30000000) {
      break;
    }
  }
}
