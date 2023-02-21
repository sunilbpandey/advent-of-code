import { readInput } from "../../utils";
import { getItemPriority, getUniqueChars } from "./common";

export const solve = async (): Promise<string> => {
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
