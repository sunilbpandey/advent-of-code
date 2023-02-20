export const loadGrid = (input: string[]) => {
  return input.reduce((grid: number[][], line) => {
    grid.push(line.split("").map((s) => parseInt(s)));
    return grid;
  }, []);
};
