import { loadGrid, updateDistances } from "./common";

export const solve = async (): Promise<string> => {
  const { grid, end } = await loadGrid();

  // Track which cells have already been processed
  const visited: boolean[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false)
  );

  // Track the distance from each cell to the end
  const distances: number[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(Infinity)
  );

  distances[end.row][end.col] = 0;
  updateDistances(distances, visited, grid);

  // Find the cell with 0 elevation that has the shortest distance to the end
  let min = Infinity;
  grid.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v === 0) {
        min = Math.min(min, distances[i][j]);
      }
    });
  });
  return min.toString();
};
