import { readInput } from "../../utils";
import { markPointsCoveredByVent, parsePoints } from "./common";

export const solve = async (): Promise<string> => {
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
