import { readInput } from "../../utils";

const loadGrid = (input: string[]) => {
  return input.reduce((grid: number[][], line) => {
    grid.push(line.split("").map((s) => parseInt(s)));
    return grid;
  }, []);
};

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

export const part1 = async (): Promise<string> => {
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

const computeViewingDistance = (heights: number[], current: number) => {
  // Find the first tree that is taller than the current tree
  // If no such tree exists, the current tree can see all the way to the end
  const index = heights.findIndex((h) => h >= current);
  return index < 0 ? heights.length : index + 1;
};

const computeScenicScore = (grid: number[][], i: number, j: number) => {
  let score = 1;

  // North
  let heights = Array.from({ length: i }, (_, k) => grid[i - k - 1][j]);
  score *= computeViewingDistance(heights, grid[i][j]);

  // South
  heights = Array.from(
    { length: grid.length - i - 1 },
    (_, k) => grid[i + 1 + k][j]
  );
  score *= computeViewingDistance(heights, grid[i][j]);

  // East
  heights = Array.from(
    { length: grid[i].length - j - 1 },
    (_, k) => grid[i][j + 1 + k]
  );
  score *= computeViewingDistance(heights, grid[i][j]);

  // West
  heights = Array.from({ length: j }, (_, k) => grid[i][j - k - 1]);
  score *= computeViewingDistance(heights, grid[i][j]);

  return score;
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const grid = loadGrid(input);

  let maxScore = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      maxScore = Math.max(maxScore, computeScenicScore(grid, i, j));
    }
  }

  return maxScore.toString();
};
