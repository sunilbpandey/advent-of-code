export const parseGrid = (lines: string[]) => {
  return lines.map((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((s) => parseInt(s))
  );
};

export const markNumberOnGrid = (grid: number[][], num: number) => {
  grid.forEach((row) => {
    row.forEach((_, col) => {
      if (row[col] === num) {
        row[col] = -1;
      }
    });
  });
};

export const gridUnmarkedSum = (grid: number[][]) => {
  return grid.reduce(
    (prev, row) =>
      prev + row.filter((n) => n !== -1).reduce((prev, cur) => prev + cur, 0),
    0
  );
};

export const bingo = (grid: number[][]) => {
  // Check all rows
  if (grid.some((row) => row.every((n) => n === -1))) {
    return true;
  }

  // Check all columns
  if (grid[0].some((_, col) => grid.every((row) => row[col] === -1))) {
    return true;
  }
  return false;
};
