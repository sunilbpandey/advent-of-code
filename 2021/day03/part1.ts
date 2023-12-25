import { readInput } from "../../utils";
import { findMostCommonBits } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const gammaBits = findMostCommonBits(input);
  const gamma = parseInt(gammaBits.join(""), 2);

  // We can calculate epsilon the same way, but we can also calculate it directly from gamma
  // Since all the bits will be flipped, gamma + epsilon = 2^n - 1, where n is in the number of bits
  const epsilon = 2 ** gammaBits.length - 1 - gamma;
  return (gamma * epsilon).toString();
};
