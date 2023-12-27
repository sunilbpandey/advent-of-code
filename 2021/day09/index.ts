import { readInput } from "../../utils";

const validNeighbours = (grid: string[], i: number, j: number) => {
  const neighbours = [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ];
  return neighbours.filter(
    ([x, y]) => x >= 0 && x < grid.length && y >= 0 && y < grid[x].length
  );
};

const isLowPoint = (grid: string[], i: number, j: number) => {
  return validNeighbours(grid, i, j).every(([x, y]) => grid[x][y] > grid[i][j]);
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let risk = 0;
  input.forEach((line, i) => {
    line.split("").forEach((ch, j) => {
      if (isLowPoint(input, i, j)) {
        risk += 1 + parseInt(ch);
      }
    });
  });
  return risk.toString();
};

const calculateBasinSize = (grid: string[], i: number, j: number) => {
  const visited: string[] = [];
  const notVisited = [[i, j]];
  while (notVisited.length) {
    [i, j] = notVisited.shift()!;

    // Don't visit a point twice
    if (visited.includes(`${i},${j}`)) {
      continue;
    }
    visited.push(`${i},${j}`);

    // Add all valid neighbours who are part of the basin to the list of points to visit
    validNeighbours(grid, i, j).forEach(([x, y]) => {
      if (grid[x][y] > grid[i][j] && grid[x][y] != "9") {
        notVisited.push([x, y]);
      }
    });
  }
  return visited.length;
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const basinSizes: number[] = [];
  input.forEach((line, i) => {
    line.split("").forEach((_, j) => {
      if (isLowPoint(input, i, j)) {
        basinSizes.push(calculateBasinSize(input, i, j));

        // Keep track of the top 3 only
        if (basinSizes.length > 3) {
          basinSizes.splice(basinSizes.indexOf(Math.min(...basinSizes)), 1);
        }
      }
    });
  });
  return basinSizes.reduce((acc, cur) => acc * cur).toString();
};
