import { readInput } from "../../utils";

// Say the positions, sorted in asceding order, are: a0, a1, ... an
// Clearly that the aligning position p must be within the range a0..an
// because anything beyond that range will require every crab to move at least one extra step.

// Returns parsed and sorted positions
const loadPositions = (input: string): number[] => {
  return input
    .split(",")
    .map((s) => parseInt(s))
    .sort((a, b) => a - b);
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  // Sort the positions and go through them calculating costs at each point
  const positions = loadPositions(input[0]);

  let minCost = Infinity;
  for (let p = positions[0]; p <= positions[positions.length - 1]; p++) {
    const cost = positions.reduce((acc, cur) => acc + Math.abs(p - cur), 0);
    minCost = Math.min(minCost, cost);
  }
  return minCost.toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const positions = loadPositions(input[0]);

  // The cost of moving 1 step is 1, 2 steps is 1 + 2, 3 steps is 1 + 2 + 3, and so on
  // So the cost of moving n steps is the sum of all numbers from 1 to n, which is n * (n + 1) / 2
  let minCost = Infinity;
  for (let p = positions[0]; p <= positions[positions.length - 1]; p++) {
    const cost = positions.reduce((acc, cur) => {
      const distance = Math.abs(p - cur);
      return acc + (distance * (distance + 1)) / 2;
    }, 0);
    minCost = Math.min(minCost, cost);
  }
  return minCost.toString();
};
