import { readInput } from "../../utils";
import { loadSizes } from "./common";

export const part2 = async () => {
  const input = await readInput(__dirname);
  const dirs = loadSizes(input);
  const sizeToRecover = 30000000 - 70000000 + dirs["/"];
  console.log(
    Math.min(...Object.values(dirs).filter((size) => size >= sizeToRecover))
  );
};

(async () => await part2())();
