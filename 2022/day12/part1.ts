import { loadGrid, updateDistances } from "./common";

export const solve = async (): Promise<string> => {
  const { grid, start, end } = await loadGrid();

  // Track which cells have already been processed
  const visited: boolean[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false)
  );

  // Track the distance from each cell to the end
  const distances: number[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(Infinity)
  );

  distances[end.row][end.col] = 0;
  updateDistances(distances, visited, grid, start);

  return distances[start.row][start.col].toString();
};
