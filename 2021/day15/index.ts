import { readInput } from "../../utils";

const loadGrid = (input: string[]) => {
  const grid: number[][] = [];
  input.forEach((line) => {
    grid.push(line.split("").map((c) => parseInt(c)));
  });
  return grid;
};

// Binary search to find the correct position to insert the key in the array
const findInsertPosition = (
  arr: string[],
  key: string,
  costs: Record<string, number>
): number => {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (costs[arr[mid]] < costs[key]) {
      start = mid + 1;
    } else if (costs[arr[mid]] > costs[key]) {
      end = mid - 1;
    } else {
      return mid;
    }
  }
  return start;
};

const calculateLowestRisk = (grid: number[][]) => {
  const visited: Record<string, boolean> = {};
  const costs: Record<string, number> = {
    "0,0": 0,
  };
  const endKey = `${grid.length - 1},${grid[0].length - 1}`;
  const unvisited: string[] = ["0,0"];

  while (true) {
    const node = unvisited.shift();
    if (node === undefined || node === endKey) {
      // We've reached the end, or there are no more nodes to visit (which shouldn't happen)
      break;
    }

    if (visited[node]) {
      // This node has already been visited, skip
      continue;
    }

    // Visit all the neighbours of this node and update their costs
    const [x, y] = node.split(",").map((s) => parseInt(s));
    const neighbours = [
      [x - 1, y],
      [x, y + 1],
      [x + 1, y],
      [x, y - 1],
    ];
    neighbours.forEach(([x1, y1]) => {
      if (x1 >= 0 && x1 < grid.length && y1 >= 0 && y1 < grid[x1].length) {
        const cost = costs[node] + grid[x1][y1];
        const key = `${x1},${y1}`;
        if (!(key in costs) || cost < costs[key]) {
          costs[key] = cost;

          // Insert the key in the correct position in the unvisited list
          // so as to keep the list sorted by cost
          // If the key already exists, don't bother removing the old entry
          // since it will have a higher cost, by the time it is reached,
          // the node will already have been visited.
          const pos = findInsertPosition(unvisited, key, costs);
          unvisited.splice(pos + 1, 0, key);
        }
      }
    });
    visited[node] = true;
  }
  return costs[endKey];
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const grid = loadGrid(input);
  return calculateLowestRisk(grid).toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const grid = loadGrid(input);

  const grid5x: number[][] = new Array(grid.length * 5);
  for (let i = 0; i < grid5x.length; i++) {
    grid5x[i] = new Array(grid[0].length * 5);
    for (let j = 0; j < grid5x[i].length; j++) {
      // For a given point (i, j) in the 5x grid,
      // the corresponding point in the original grid is: (i % grid.length, j % grid[0].length)
      // The original value is then incremented by the distance, in terms of tiles, from the original tile
      grid5x[i][j] =
        grid[i % grid.length][j % grid[0].length] +
        Math.floor(i / grid.length) +
        Math.floor(j / grid[0].length);

      // And finally, all values above 9 are wrapped around to 1
      grid5x[i][j] = ((grid5x[i][j] - 1) % 9) + 1;
    }
  }
  return calculateLowestRisk(grid5x).toString();
};
