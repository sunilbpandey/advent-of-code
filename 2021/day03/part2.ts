import { readInput } from "../../utils";
import { findMostCommonBits } from "./common";

// Helper function to filter values based on a compare function
const filterValues = (
  values: string[],
  compareFn: (a: string, b: string) => boolean
): number => {
  for (let i = 0; values.length > 1 && i < values[0].length; i++) {
    const mostCommonBits = findMostCommonBits(values);
    values = values.filter((v) => compareFn(v[i], mostCommonBits[i]));
  }
  return parseInt(values[0], 2);
};

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  // For oxygen generator rating,
  // keep entries with bits matching the most common bit in that position
  const o2rating = filterValues(input.slice(), (a, b) => a === b);

  // For CO2 scrubber rating,
  // keep entries with bits matching the least common bit value in that position
  // Since mostCommonBits contains the most common value in each position, we just keep
  // all entries with bits not matching that value.
  // If there are equal number of 0s and 1s in a position, mostCommonBits will contain 1,
  // but we want entries with 0 in that position, so this logic works.
  const co2rating = filterValues(input.slice(), (a, b) => a !== b);

  return (o2rating * co2rating).toString();
};
