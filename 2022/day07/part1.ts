import { readInput } from "../../utils";
import { loadSizes } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const dirs = loadSizes(input);
  return Object.values(dirs)
    .filter((size) => size <= 100000)
    .reduce((sum, cur) => sum + cur, 0)
    .toString();
};
