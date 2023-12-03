import { readFileSync } from "fs";
import { validateHeaderName } from "http";

const amounts = {
  red: 12,
  green: 13,
  blue: 14,
};

const fileContents = readFileSync("./input.txt", "utf8").split("\n");
const redRegex = /(\d+) red/;
const greenRegex = /(\d+) green/;
const blueRegex = /(\d+) blue/;
const gameIDRegex = /Game (\d+):/;

function findValidGames(amounts) {
  let idTotals = 0;

  fileContents.forEach((game) => {
    const gameId = parseInt(game.match(gameIDRegex)[1]);
    const rounds = game.split(";");
    let isValidRound = true;

    rounds.forEach((round) => {
      const redBlocks = parseInt(round.match(redRegex)?.[1]);
      const greenBlocks = parseInt(round.match(greenRegex)?.[1]);
      const blueBlocks = parseInt(round.match(blueRegex)?.[1]);

      if (
        redBlocks > amounts.red ||
        greenBlocks > amounts.green ||
        blueBlocks > amounts.blue
      ) {
        isValidRound = false;
      }
    });
    if (isValidRound) {
      idTotals += gameId;
    }
  });
  console.log(idTotals);
}

findValidGames(amounts);

function findSumOfPowers() {
  let powerTotal = 0;
  fileContents.forEach((game) => {
    const rounds = game.split(";");

    let highestRed = 0;
    let highestGreen = 0;
    let highestBlue = 0;

    rounds.forEach((round) => {
      const redBlocks = parseInt(round.match(redRegex)?.[1]);
      const greenBlocks = parseInt(round.match(greenRegex)?.[1]);
      const blueBlocks = parseInt(round.match(blueRegex)?.[1]);

      if (highestRed < redBlocks) highestRed = redBlocks;
      if (highestGreen < greenBlocks) highestGreen = greenBlocks;
      if (highestBlue < blueBlocks) highestBlue = blueBlocks;
    });

    const totalPower = highestRed * highestGreen * highestBlue;
    powerTotal += totalPower;
  });
  console.log(powerTotal);
}

findSumOfPowers();
