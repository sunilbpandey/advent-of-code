import { readInput } from "../../utils";

const parsePoints = (line: string) => {
  return line
    .split(" -> ")
    .map((point) => point.split(",").map((coord) => parseInt(coord)))
    .flat();
};

const markPoint = (grid: Record<string, number>, x: number, y: number) => {
  const key = `${x},${y}`;
  grid[key] = grid[key] ? grid[key] + 1 : 1;
};

const markPointsCoveredByVent = (
  grid: any,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const stepX = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
  const stepY = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;
  for (let px = x1, py = y1; ; px += stepX, py += stepY) {
    markPoint(grid, px, py);
    if (px === x2 && py === y2) {
      break;
    }
  }
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  // Find the horizontal and vertical vents
  // and mark all the points covered by a vent on a grid
  const grid: Record<string, number> = {};
  input
    .map((line) => parsePoints(line))
    .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
    .forEach(([x1, y1, x2, y2]) => {
      markPointsCoveredByVent(grid, x1, y1, x2, y2);
    });
  return Object.values(grid)
    .filter((value: number) => value > 1)
    .length.toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  // Mark all the points covered by all the vents on a grid
  const grid: Record<string, number> = {};
  input
    .map((line) => parsePoints(line))
    .forEach(([x1, y1, x2, y2]) => {
      markPointsCoveredByVent(grid, x1, y1, x2, y2);
    });
  return Object.values(grid)
    .filter((value: number) => value > 1)
    .length.toString();
};
