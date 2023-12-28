import { readInput } from "../../utils";

const loadData = (input: string[]) => {
  const coordinates: string[] = [];
  const folds: string[] = [];
  for (const line of input) {
    if (line.match(/^\d+,\d+$/)) {
      coordinates.push(line);
    } else if (line.match(/^fold along /)) {
      folds.push(line.slice(11));
    }
  }
  return { coordinates, folds };
};

const performFold = (coordinates: string[], rule: string) => {
  const [axis, value] = rule.split("=");
  const fold = parseInt(value);

  const folded: string[] = [];
  coordinates.forEach((dot) => {
    let [x, y] = dot.split(",").map((s) => parseInt(s));

    // If axis is y, fold up; if axis is x, fold left.
    // Every point above or to the left of the fold remains unchanged.
    // Say we are folding along axis y, and the fold is at y0.
    // A point at y1, where y1 > 0, will be moved to (y1 - y0) rows above the fold.
    // So, the new y coordinate is y0 - (y1 - y0) = 2 * y0 - y1.
    if (axis === "y") {
      y = y < fold ? y : 2 * fold - y;
    } else {
      x = x < fold ? x : 2 * fold - x;
    }

    dot = `${x},${y}`;
    if (!folded.includes(dot)) {
      folded.push(dot);
    }
  });
  coordinates.splice(0, coordinates.length, ...folded);
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const { coordinates, folds } = loadData(input);

  performFold(coordinates, folds[0]);
  return coordinates.length.toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const { coordinates, folds } = loadData(input);

  for (const rule of folds) {
    performFold(coordinates, rule);
  }

  // Now print the grid to console to get the answer
  const grid: string[][] = [];
  for (const point of coordinates) {
    const [x, y] = point.split(",").map((s) => parseInt(s));

    // Grow the grid as needed
    for (let i = grid.length; i < y + 1; i++) {
      grid.push([]);
    }
    for (let i = grid[y].length; i < x + 1; i++) {
      grid[y].push(" ");
    }
    grid[y][x] = "▊";
  }
  return grid.map((row) => row.join("")).join("\n");
};
