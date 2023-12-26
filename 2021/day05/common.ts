export const parsePoints = (line: string) => {
  return line
    .split(" -> ")
    .map((point) => point.split(",").map((coord) => parseInt(coord)))
    .flat();
};

const markPoint = (grid: Record<string, number>, x: number, y: number) => {
  const key = `${x},${y}`;
  grid[key] = grid[key] ? grid[key] + 1 : 1;
};

export const markPointsCoveredByVent = (
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
