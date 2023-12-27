import { readInput } from "../../utils";

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  let current = 0;
  let max = 0;
  input.forEach((line) => {
    if (line === "") {
      max = Math.max(current, max);
      current = 0;
    } else {
      current += parseInt(line);
    }
  });
  return max.toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  let current = 0;
  const topThree = [0, 0, 0];
  input.forEach((line) => {
    if (line === "") {
      topThree.sort();
      topThree[0] = current > topThree[0] ? current : topThree[0];
      current = 0;
    } else {
      current += parseInt(line);
    }
  });
  return topThree.reduce((prev, cur) => prev + cur, 0).toString();
};
