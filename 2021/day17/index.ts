import { readInput } from "../../utils";

const loadTargetArea = (input: string) => {
  return input
    .split(": ")[1]
    .split(", ")
    .map((s) =>
      s
        .split("=")[1]
        .split("..")
        .map((s) => parseInt(s))
    )
    .flat();
};

const probeReachesTargetArea = (
  tx1: number,
  tx2: number,
  ty1: number,
  ty2: number,
  X: number,
  Y: number
): boolean => {
  let x = 0;
  let y = 0;
  let xs = X;
  let ys = Y;
  while (x <= tx2 && y >= ty1) {
    if (x >= tx1 && x <= tx2 && y >= ty1 && y <= ty2) {
      return true;
    }

    x += xs;
    y += ys;
    if (xs > 0) {
      xs--;
    }
    ys--;
  }
  return false;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const [tx1, tx2, ty1, ty2] = loadTargetArea(input[0]);

  let maxY = 0;
  for (let Y = Math.abs(ty1); Y > 0; Y--) {
    for (let X = 1; X <= tx2; X++) {
      if (X * (X + 1) < 2 * tx1) {
        continue;
      }

      if (probeReachesTargetArea(tx1, tx2, ty1, ty2, X, Y)) {
        maxY = Y;
        break;
      }
    }
    if (maxY > 0) {
      break;
    }
  }
  return ((maxY * (maxY + 1)) / 2).toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const [tx1, tx2, ty1, ty2] = loadTargetArea(input[0]);

  const velocities = new Set<string>();
  for (let Y = Math.abs(ty1); Y >= ty1; Y--) {
    for (let X = 1; X <= tx2; X++) {
      if (X * (X + 1) < 2 * tx1) {
        continue;
      }

      if (probeReachesTargetArea(tx1, tx2, ty1, ty2, X, Y)) {
        velocities.add(`${X},${Y}`);
      }
    }
  }
  return velocities.size.toString();
};
