import { readInput } from "../../utils";

const LOWER_A = "a".charCodeAt(0);
const UPPER_A = "A".charCodeAt(0);

const getItemPriority = (item: string) => {
  if (item >= "a" && item <= "z") {
    return item.charCodeAt(0) - LOWER_A + 1;
  }

  if (item >= "A" && item <= "Z") {
    return item.charCodeAt(0) - UPPER_A + 27;
  }
  throw new Error(`Unknown item ${item}`);
};

const getUniqueChars = (str: string) => new Set(Array.from(str));

export const part1 = async (): Promise<string> => {
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

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let sum = 0;
  for (let i = 0; i < input.length; i += 3) {
    // For each group of three elves, find how many elves have each item type.
    const group: { [key: string]: number } = {};
    input.slice(i, i + 3).forEach((line) => {
      [...getUniqueChars(line)].forEach((item) => {
        group[item] = (group[item] || 0) + 1;
      });
    });

    // If exactly three elves have an item, that must be the badge.
    const badge = Object.keys(group).find((k) => group[k] === 3);
    if (badge) {
      sum += getItemPriority(badge);
    }
  }
  return sum.toString();
};
