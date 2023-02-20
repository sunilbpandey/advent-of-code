import { readInput } from "../../utils";
import { loadSizes } from "./common";

export const part1 = async () => {
  const input = await readInput(__dirname);
  const dirs = loadSizes(input);
  console.log(
    Object.values(dirs)
      .filter((size) => size <= 100000)
      .reduce((sum, cur) => sum + cur, 0)
  );
};

(async () => await part1())();
