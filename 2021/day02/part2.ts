import { readInput } from "../../utils";

export const solve = async (): Promise<string> => {
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
