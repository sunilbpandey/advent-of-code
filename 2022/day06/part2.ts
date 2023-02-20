import { readInput } from "../../utils";
import { findMarker } from "./common";

export const part2 = async () => {
  const input = await readInput(__dirname);
  console.log(findMarker(input[0], 14));
};

(async () => await part2())();
