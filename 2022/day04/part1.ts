import { readInput } from "../../utils";
import { expandRange } from "./common";

const getSectionPairs = (line: string) => {
  return line
    .split(",")
    .map(expandRange)
    .sort((a, b) => a.length - b.length);
};

// Given two ranges, where first range is smaller or same size as second range,
// first range is fully contained in second range if its first element is greater or equal,
// and its last element is less than or equal.
const fullyContains = ([l, r]: number[][]) =>
  l[0] >= r[0] && l[l.length - 1] <= r[r.length - 1];

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return input.map(getSectionPairs).filter(fullyContains).length.toString();
};
