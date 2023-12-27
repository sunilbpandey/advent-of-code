import { readInput } from "../../utils";

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let position = 0;
  let depth = 0;
  input.forEach((line) => {
    const [command, value] = line.split(" ");
    const amount = parseInt(value);
    switch (command) {
      case "forward":
        position += amount;
        break;
      case "down":
        depth += amount;
        break;
      case "up":
        depth -= amount;
        break;
    }
  });
  return (position * depth).toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let position = 0;
  let depth = 0;
  let aim = 0;
  input.forEach((line) => {
    const [command, value] = line.split(" ");
    const amount = parseInt(value);
    switch (command) {
      case "forward":
        position += amount;
        depth += aim * amount;
        break;
      case "down":
        aim += amount;
        break;
      case "up":
        aim -= amount;
        break;
    }
  });
  return (position * depth).toString();
};
