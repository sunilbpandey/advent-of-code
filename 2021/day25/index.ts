import { readInput } from "../../utils";

const copy = (src: string[][], dst: string[][]) => {
  src.forEach((row, y) => {
    dst[y] = [...row];
  });
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let grid: string[][] = [];
  input.forEach((line) => {
    grid.push(line.split(""));
  });

  for (let step = 1; ; step++) {
    let moved = false;
    const updated: string[][] = new Array(grid.length);
    copy(grid, updated);

    // First, move east
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === ">") {
          if (row[(x + 1) % row.length] === ".") {
            updated[y][x] = ".";
            updated[y][(x + 1) % row.length] = ">";
            moved = true;
          }
        }
      });
    });
    copy(updated, grid);

    // Then move south
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === "v") {
          if (grid[(y + 1) % grid.length][x] === ".") {
            updated[y][x] = ".";
            updated[(y + 1) % grid.length][x] = "v";
            moved = true;
          }
        }
      });
    });
    copy(updated, grid);

    if (!moved) {
      return step.toString();
    }
  }
};
