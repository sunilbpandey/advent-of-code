import { readInput } from "../../utils";
import { bingo, gridUnmarkedSum, markNumberOnGrid, parseGrid } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const numbers = input[0].split(",").map((s) => parseInt(s));

  let earliestWinner = numbers.length;
  let score = 0;
  for (let i = 2; i < input.length; i += 6) {
    let grid = parseGrid(input.slice(i, i + 5));
    for (let j = 0; j < numbers.length; j++) {
      markNumberOnGrid(grid, numbers[j]);
      if (bingo(grid)) {
        const unmarkedSum = gridUnmarkedSum(grid);
        if (j < earliestWinner) {
          earliestWinner = j;
          score = unmarkedSum * numbers[j];
        }
        break;
      }
    }
  }
  return score.toString();
};
