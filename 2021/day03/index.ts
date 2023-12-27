import { readInput } from "../../utils";

// Given a list of bit strings, return the most common bit at each position.
const findMostCommonBits = (input: string[]): string[] => {
  // Count the number of 1s in each position
  // At the end, if the value at a position is greater than half the length of the initial array,
  // there were more 1s, otherwise there were more 0s.
  const countOfOnes: number[] = new Array(input[0].length).fill(0);
  input.forEach((line) => {
    line.split("").forEach((c, i) => {
      countOfOnes[i] += parseInt(c);
    });
  });
  return countOfOnes.map((c) => (c < input.length / 2 ? "0" : "1"));
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const gammaBits = findMostCommonBits(input);
  const gamma = parseInt(gammaBits.join(""), 2);

  // We can calculate epsilon the same way, but we can also calculate it directly from gamma
  // Since all the bits will be flipped, gamma + epsilon = 2^n - 1, where n is in the number of bits
  const epsilon = 2 ** gammaBits.length - 1 - gamma;
  return (gamma * epsilon).toString();
};

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

export const part2 = async (): Promise<string> => {
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
