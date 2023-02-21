import { readInput } from "../../utils";
import { loadGrid } from "./common";

const updateVisibility = (
  grid: number[][],
  visibility: boolean[][],
  i: number,
  j: number,
  max: number
): number => {
  // A tree is visible from current direction if it's taller than the tallest tree so far
  if (grid[i][j] > max) {
    max = grid[i][j];
    visibility[i][j] = true;
  }
  return max;
};

const range = (end: number) => {
  return Array.from({ length: end }, (_, i) => i);
};

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const grid = loadGrid(input);

  const rows = grid.length;
  const cols = grid[0].length;

  const visibility: boolean[][] = Array.from(Array(rows), () =>
    Array(cols).fill(false)
  );

  // Check each row from left to right and right to left
  for (let i = 0; i < rows; i++) {
    range(cols).reduce(
      (max, j) => updateVisibility(grid, visibility, i, j, max),
      -1
    );
    range(cols).reduceRight(
      (max, j) => updateVisibility(grid, visibility, i, j, max),
      -1
    );
  }

  // Check each column from top to bottom and bottom to top
  for (let j = 0; j < cols; j++) {
    range(rows).reduce(
      (max, i) => updateVisibility(grid, visibility, i, j, max),
      -1
    );
    range(rows).reduceRight(
      (max, i) => updateVisibility(grid, visibility, i, j, max),
      -1
    );
  }

  return visibility
    .reduce((total, row) => total + row.filter((v) => v).length, 0)
    .toString();
};
