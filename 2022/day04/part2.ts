import { readInput } from "../../utils";
import { expandRange } from "./common";

const getSectionPairs = (line: string) => {
  return line
    .split(",")
    .map(expandRange)
    .sort((a, b) => a[0] - b[0]);
};

// Given two ranges, where first range starts at the same or smaller number as the second range,
// first range is overlapping with second range if its last element is greater than or equal to
// the second range's first element.
const areOverlapping = ([l, r]: number[][]) => r[0] <= l[l.length - 1];

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return input.map(getSectionPairs).filter(areOverlapping).length.toString();
};
