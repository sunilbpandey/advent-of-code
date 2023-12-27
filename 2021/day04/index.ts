import { readInput } from "../../utils";

const parseGrid = (lines: string[]) => {
  return lines.map((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((s) => parseInt(s))
  );
};

const markNumberOnGrid = (grid: number[][], num: number) => {
  grid.forEach((row) => {
    row.forEach((_, col) => {
      if (row[col] === num) {
        row[col] = -1;
      }
    });
  });
};

const gridUnmarkedSum = (grid: number[][]) => {
  return grid.reduce(
    (prev, row) =>
      prev + row.filter((n) => n !== -1).reduce((prev, cur) => prev + cur, 0),
    0
  );
};

const bingo = (grid: number[][]) => {
  // Check all rows
  if (grid.some((row) => row.every((n) => n === -1))) {
    return true;
  }

  // Check all columns
  if (grid[0].some((_, col) => grid.every((row) => row[col] === -1))) {
    return true;
  }
  return false;
};

export const part1 = async (): Promise<string> => {
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

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const numbers = input[0].split(",").map((s) => parseInt(s));

  let latestWinner = 0;
  let score = 0;
  for (let i = 2; i < input.length; i += 6) {
    let grid = parseGrid(input.slice(i, i + 5));
    for (let j = 0; j < numbers.length; j++) {
      markNumberOnGrid(grid, numbers[j]);
      if (bingo(grid)) {
        const unmarkedSum = gridUnmarkedSum(grid);
        if (j > latestWinner) {
          latestWinner = j;
          score = unmarkedSum * numbers[j];
        }
        break;
      }
    }
  }
  return score.toString();
};
