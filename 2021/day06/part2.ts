import { readInput } from "../../utils";
import { loadTimers, sum, updateTimers } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const timers = loadTimers(input[0]);
  for (let day = 0; day < 256; day++) {
    updateTimers(timers, day);
  }
  return sum(timers).toString();
};
