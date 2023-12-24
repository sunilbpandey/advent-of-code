import { readInput } from "../../utils";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  // There is no need to compute the sum. We just need to compare the number being
  // added with the number being removed. The other two numbers are in both the
  // windows so they cancel out.

  let window: number[] = [];
  let measurementIncreases = 0;
  input.forEach((line) => {
    const depth = parseInt(line);
    if (window.length === 3) {
      if (window.shift()! < depth) {
        measurementIncreases++;
      }
    }
    window.push(depth);
  });

  return measurementIncreases.toString();
};
