// loop through to find first, break loop then loop from final character backwards to find digit
import fs from "fs";

type FindFirstAndLastDigit = (filename: string) => number;

const findFirstAndLastDigit: FindFirstAndLastDigit = (filename) => {
  const fileContents = fs.readFileSync(filename, "utf8");

  const splitContents = fileContents.split("\n");

  const firstAndLastDigits = splitContents.map((line: string) => {
    const numRegex = /\d/;
    let numString: string = "";

    const firstMatch = line.match(numRegex)?.[0];
    numString += firstMatch;

    for (let i = line.length - 1; i >= 0; i--) {
      const currChar: string = line[i];
      if (numRegex.test(currChar)) {
        numString += currChar;
        break;
      }
    }
    return numString;
  });

  const sumOfDigits: number = firstAndLastDigits.reduce((acc, currVal) => {
    const num = parseInt(currVal);
    return acc + num;
  }, 0);
  return sumOfDigits;
};

console.log(findFirstAndLastDigit("./input1.txt"));

const findFirstAndLastNumber: FindFirstAndLastDigit = (filename) => {
  const fileContents = fs.readFileSync(filename, "utf8");

  const splitContents = fileContents.split("\n");
  const numRef = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };

  let numTotal = 0;
  splitContents.forEach((line: string) => {
    const numRegex = /(\d|one|two|three|four|five|six|seven|eight|nine)/;

    const firstMatch = line.match(numRegex)?.[0];
    let numString = firstMatch ? numRef[firstMatch] : "";

    for (let i = line.length - 1; i >= 0; i--) {
      const subStr = line.substring(i);
      const match = subStr.match(numRegex);
      if (match) {
        numString += numRef[match[0]];
        break;
      }
    }
    numTotal += parseInt(numString);
  });

  return numTotal;
};

console.log(findFirstAndLastNumber("./input1.txt"));
