import { readInput } from "../../utils";

// Instead of keeping a list of fish, we will group the fish by their internal timer
// We know the timer will never be more than 8, so we can use a fixed array

// Say on day n, the timers look like [a, b, c, d, e, f, g, h, i]
// On day n + 1, every fish that had a timer T will now have a timer T - 1, for T > 0
// Every fish that had timer 0 will have timer 6, and those many new fish will be added
// with timer 8
// As a result, the timers on day n + 1 will look like [b, c, d, e, f, g, h + a, i, a]
// Observe that this is same as [a, b, c, d, e, f, g, h + a, i], rotated left by 1
// This way, we can avoid having to move array elements around

const loadTimers = (input: string): number[] => {
  // Load the fish and bucketize them based on the timer
  const timers = input.split(",").map((t) => parseInt(t));
  return timers.reduce((acc, cur) => {
    acc[cur]++;
    return acc;
  }, Array(9).fill(0));
};

const updateTimers = (timers: number[], day: number) => {
  timers[(day + 7) % timers.length] += timers[day % timers.length];
};

const sum = (arr: number[]) => {
  return arr.reduce((acc, cur) => acc + cur);
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const timers = loadTimers(input[0]);
  for (let day = 0; day < 80; day++) {
    updateTimers(timers, day);
  }
  return sum(timers).toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const timers = loadTimers(input[0]);
  for (let day = 0; day < 256; day++) {
    updateTimers(timers, day);
  }
  return sum(timers).toString();
};
