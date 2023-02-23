import { readInput } from "../../utils";

class Cell {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  equals = (other: Cell) => {
    return this.row === other.row && this.col === other.col;
  };

  isWithinGrid = (grid: number[][]) => {
    return (
      this.row >= 0 &&
      this.row < grid.length &&
      this.col >= 0 &&
      this.col < grid[0].length
    );
  };

  canMoveto = (grid: number[][], neighbor: Cell) => {
    return (
      neighbor.isWithinGrid(grid) &&
      grid[neighbor.row][neighbor.col] <= grid[this.row][this.col] + 1
    );
  };
}

const getNeighbors = (grid: number[][], cell: Cell) => {
  const neighbors: Cell[] = [
    new Cell(cell.row - 1, cell.col),
    new Cell(cell.row + 1, cell.col),
    new Cell(cell.row, cell.col - 1),
    new Cell(cell.row, cell.col + 1),
  ];
  return neighbors.filter(
    (n) => n.isWithinGrid(grid) && n.canMoveto(grid, cell)
  );
};

const findShortestDistanceUnvisitedCell = (
  distances: number[][],
  visited: boolean[][]
): Cell | undefined => {
  let minDistance = Infinity;
  let minCell: Cell | undefined = undefined;
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[i].length; j++) {
      if (!visited[i][j] && distances[i][j] < minDistance) {
        minDistance = distances[i][j];
        minCell = new Cell(i, j);
      }
    }
  }
  return minCell;
};

export const loadGrid = async () => {
  const input = await readInput(__dirname);

  const grid: number[][] = [];
  let start = new Cell(0, 0);
  let end = new Cell(0, 0);

  input.forEach((line) => {
    grid.push(
      line.split("").map((c, index) => {
        const cell = new Cell(grid.length, index);
        if (c === "S") {
          c = "a";
          start = cell;
        } else if (c == "E") {
          c = "z";
          end = cell;
        }

        return c.charCodeAt(0) - "a".charCodeAt(0);
      })
    );
  });

  return { grid, start, end };
};

export const updateDistances = (
  distances: number[][],
  visited: boolean[][],
  grid: number[][],
  start: Cell | undefined = undefined
) => {
  while (true) {
    // Find the unvisited cell with the shortest distance to the end
    const u = findShortestDistanceUnvisitedCell(distances, visited);
    if (!u) {
      break;
    }

    visited[u.row][u.col] = true;

    // Get all the valid neighbors of u
    const neighbors = getNeighbors(grid, u);

    // Update the distances of all unvisited neighbors
    neighbors
      .filter((n) => !visited[n.row][n.col])
      .forEach((v) => {
        distances[v.row][v.col] = Math.min(
          distances[v.row][v.col],
          distances[u.row][u.col] + 1
        );
      });

    if (start && u.equals(start)) {
      break;
    }
  }
};
