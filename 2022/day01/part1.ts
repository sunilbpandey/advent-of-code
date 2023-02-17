import { readInput } from "../../utils";

export const part1 = async () => {
  const input = await readInput(__dirname);
  let current = 0;
  let max = 0;
  input.forEach((line) => {
    if (line === "") {
      max = Math.max(current, max);
      current = 0;
    } else {
      current += parseInt(line);
    }
  });
  console.log(max);
};

(async () => await part1())();
