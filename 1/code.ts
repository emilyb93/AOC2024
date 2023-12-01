// loop through to find first, break loop then loop from final character backwards to find digit
import fs from "fs";

type FindFirstAndLastDigit = (filename: string) => number;

const findFirstAndLastDigit: FindFirstAndLastDigit = (filename) => {
  const fileContents = fs.readFileSync(filename, "utf8");

  const splitContents = fileContents.split("\n");

  const firstAndLastDigits = splitContents.map((line: string) => {
    const numRegex = /\d/;
    let numString: string = "";

    // loop forward
    for (let i = 0; i < line.length; i++) {
      const currChar: string = line[i];
      if (numRegex.test(currChar)) {
        numString += currChar;
        break;
      }
    }
    // loop backward
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
