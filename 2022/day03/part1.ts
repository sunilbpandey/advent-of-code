import { readInput } from "../../utils";
import { getUniqueChars, getItemPriority } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let sum = 0;
  input.forEach((line) => {
    const compartment1 = getUniqueChars(line.slice(0, line.length / 2));
    const compartment2 = getUniqueChars(line.slice(line.length / 2));
    const shared = [...compartment2].filter((s) => compartment1.has(s));
    sum += shared.reduce((n, s) => n + getItemPriority(s), 0);
  });
  return sum.toString();
};
