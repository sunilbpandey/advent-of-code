import { readInput } from "../../utils";
import { loadSizes } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const dirs = loadSizes(input);
  const sizeToRecover = 30000000 - 70000000 + dirs["/"];
  return Math.min(
    ...Object.values(dirs).filter((size) => size >= sizeToRecover)
  ).toString();
};
