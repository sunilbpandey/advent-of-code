import { readInput } from "../../utils";

export const solve = async (): Promise<string> => {
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
