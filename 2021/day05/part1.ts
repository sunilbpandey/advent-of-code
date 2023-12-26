import { readInput } from "../../utils";
import { markPointsCoveredByVent, parsePoints } from "./common";

export const solve = async (): Promise<string> => {
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
