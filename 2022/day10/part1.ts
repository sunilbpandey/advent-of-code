import { readInput } from "../../utils";

const calculateSignalStrength = (cycle: number, x: number): number => {
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    return x * cycle;
  }
  return 0;
};

export const part1 = async () => {
  const input = await readInput(__dirname);

  let x = 1;
  let cycle = 0;
  let strength = 0;
  input.forEach((line) => {
    if (line === "noop") {
      strength += calculateSignalStrength(++cycle, x);
    } else {
      strength += calculateSignalStrength(++cycle, x);
      strength += calculateSignalStrength(++cycle, x);
      x += parseInt(line.split(" ")[1]);
    }
  });
  console.log(strength);
};

(async () => await part1())();
