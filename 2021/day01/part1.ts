import { readInput } from "../../utils";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let previous: number;
  let measurementIncreases = 0;
  input.forEach((line) => {
    const depth = parseInt(line);
    if (previous < depth) {
      measurementIncreases++;
    }
    previous = depth;
  });

  return measurementIncreases.toString();
};
