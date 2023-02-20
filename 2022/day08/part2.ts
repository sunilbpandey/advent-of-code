import { readInput } from "../../utils";
import { loadGrid } from "./common";

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

export const part2 = async () => {
  const input = await readInput(__dirname);
  const grid = loadGrid(input);

  let maxScore = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      maxScore = Math.max(maxScore, computeScenicScore(grid, i, j));
    }
  }

  console.log(maxScore);
};

(async () => await part2())();
