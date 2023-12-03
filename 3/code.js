import { readFileSync } from "fs";

const fileContents = readFileSync("./input.txt", "utf8").split("\n");

function findSumOfGearRatios() {
  const symbolRegex = /[^\d.]/;
  let total = 0;

  for (let y = 0; y < fileContents.length; y++) {
    const currentLine = fileContents[y];

    for (let x = 0; x < currentLine.length; x++) {
      const currChar = currentLine[x];

      if (parseInt(currChar)) {
        const fullNumRegex = /(\d+)/;

        const fullNum = currentLine.substring(x).match(fullNumRegex)[1];

        const lineAbove =
          fileContents[y - 1]?.substring(x - 1, x + fullNum.length + 1) || "";
        const lineBelow =
          fileContents[y + 1]?.substring(x - 1, x + fullNum.length + 1) || "";
        const leftChar = currentLine[x - 1] || "";
        const rightChar = currentLine[x + fullNum.length] || "";
        const surroundingChars = [
          lineAbove,
          leftChar,
          rightChar,
          lineBelow,
        ].join("");

        if (symbolRegex.test(surroundingChars)) total += parseInt(fullNum);
        x += fullNum.length;
      }
    }
  }

  console.log(total);
}
findSumOfGearRatios();
