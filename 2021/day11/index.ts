import { readInput } from "../../utils";

const isValidCoordinate = (grid: number[][], i: number, j: number) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
};

const neighbours = (grid: number[][], i: number, j: number) => {
  const neighbours: number[][] = [];
  for (let i1 = i - 1; i1 <= i + 1; i1++) {
    for (let j1 = j - 1; j1 <= j + 1; j1++) {
      if (isValidCoordinate(grid, i1, j1) && (i1 !== i || j1 !== j)) {
        neighbours.push([i1, j1]);
      }
    }
  }
  return neighbours;
};

const performStep = (grid: number[][]) => {
  let flashCount = 0;

  // First increment all cells
  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      grid[i][j]++;
    });
  });

  // Now scan for flashes
  // Loop while at least one flash happens in an iteration
  let prevFlashCount = -1;
  while (prevFlashCount < flashCount) {
    prevFlashCount = flashCount;
    grid.forEach((row, i) => {
      row.forEach((_, j) => {
        if (grid[i][j] > 9) {
          flashCount++;
          grid[i][j] = 0;

          // Increment all neighbours, unless they have also flashed this step
          neighbours(grid, i, j)
            .filter(([x, y]) => grid[x][y] !== 0)
            .forEach(([x, y]) => grid[x][y]++);
        }
      });
    });
  }
  return flashCount;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const grid = input.map((line) => line.split("").map((s) => parseInt(s)));

  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    flashes += performStep(grid);
  }
  return flashes.toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const grid = input.map((line) => line.split("").map((s) => parseInt(s)));

  let step = 0;
  for (; ; step++) {
    if (grid.every((row) => row.every((n) => n === 0))) {
      break;
    }
    performStep(grid);
  }
  return step.toString();
};
