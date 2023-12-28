import { readInput } from "../../utils";

/*
 * While applying the rules, position of the pairs within the string
 * doesn't matter. This is helpful because the number of distinct
 * pairs is limited, regardless of how long the string gets.
 *
 * Given a rule CH -> B, the pair CH anywhere in the string will result in
 * two new pairs: CB and BH
 * So we just need to keep track of the pairs and their counts.
 *
 * Also note, because pairs overlap, all letters except the first and last
 * letter will appear twice. However, the first and last letter of the final
 * string will be the same as the initial string, so we can easily get those.
 */

const upsert = (obj: Record<string, number>, key: string, count: number) => {
  obj[key] = (obj[key] || 0) + count;
};

const solve = async (steps: number): Promise<string> => {
  const input = await readInput(__dirname);
  const polymer = input[0];
  const rules = Object.fromEntries(input.slice(2).map((s) => s.split(" -> ")));

  let pairs: Record<string, number> = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    upsert(pairs, polymer.slice(i, i + 2), 1);
  }

  for (let step = 0; step < steps; step++) {
    const newPairs: Record<string, number> = {};
    for (const [pair, count] of Object.entries(pairs)) {
      upsert(newPairs, pair[0] + rules[pair], count);
      upsert(newPairs, rules[pair] + pair[1], count);
    }
    pairs = newPairs;
  }

  // As we go through each pair and count the elements,
  // every element, except the first and last elements of the initial polymer, will be counted twice
  // Adjust the counts so that ever element is counted twice
  const elements: Record<string, number> = {
    [polymer[0]]: 1,
    [polymer[polymer.length - 1]]: 1,
  };

  Object.entries(pairs).forEach(([pair, count]) => {
    upsert(elements, pair[0], count);
    upsert(elements, pair[1], count);
  });
  const counts = Object.values(elements).map((n) => n / 2);
  return (Math.max(...counts) - Math.min(...counts)).toString();
};

export const part1 = async (): Promise<string> => {
  return solve(10);
};

export const part2 = async (): Promise<string> => {
  return solve(40);
};
