import { readInput } from "../../utils";
import { loadStartingStacks, parseMove } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const stacks = loadStartingStacks(input);

  const moves = input.slice(input.indexOf("") + 1);
  moves.forEach((line) => {
    const { count, from, to } = parseMove(line);
    const crates = stacks[from].splice(0, count);
    crates.forEach((crate) => stacks[to].unshift(crate));
  });
  return stacks.map((stack) => stack[0]).join("");
};
