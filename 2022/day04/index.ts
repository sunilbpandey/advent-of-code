import { readInput } from "../../utils";

// Given a range like "1-3", return [1, 2, 3]
const expandRange = (range: string) => {
  const [start, end] = range.split("-").map((s) => parseInt(s));
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const getSectionPairs1 = (line: string) => {
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

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return input.map(getSectionPairs1).filter(fullyContains).length.toString();
};

const getSectionPairs2 = (line: string) => {
  return line
    .split(",")
    .map(expandRange)
    .sort((a, b) => a[0] - b[0]);
};

// Given two ranges, where first range starts at the same or smaller number as the second range,
// first range is overlapping with second range if its last element is greater than or equal to
// the second range's first element.
const areOverlapping = ([l, r]: number[][]) => r[0] <= l[l.length - 1];

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return input.map(getSectionPairs2).filter(areOverlapping).length.toString();
};
