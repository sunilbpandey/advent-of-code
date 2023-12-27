import { readInput } from "../../utils";

const loadStartingStacks = (input: string[]) => {
  const header = input.slice(0, input.indexOf(""));

  // Parse the last line of the header to find out the number of stacks
  const numStacks = header[header.length - 1].trim().split(/\s*/).length;
  const stacks: string[][] = Array.from({ length: numStacks }, (_) => []);
  header.slice(0, header.length - 1).forEach((line) => {
    for (let i = 1; i < line.length; i += 4) {
      if (line[i] !== " ") {
        stacks[(i - 1) / 4].push(line[i]);
      }
    }
  });
  return stacks;
};

const parseMove = (move: string) => {
  const parts = move.split(" ");
  return {
    count: parseInt(parts[1]),
    from: parseInt(parts[3]) - 1,
    to: parseInt(parts[5]) - 1,
  };
};

export const part1 = async (): Promise<string> => {
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

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const stacks = loadStartingStacks(input);

  const moves = input.slice(input.indexOf("") + 1);
  moves.forEach((line) => {
    const { count, from, to } = parseMove(line);
    const crates = stacks[from].splice(0, count);
    stacks[to].splice(0, 0, ...crates);
  });
  return stacks.map((stack) => stack[0]).join("");
};
