import { readInput } from "../../utils";
import { findMarker } from "./common";

export const part1 = async () => {
  const input = await readInput(__dirname);
  console.log(findMarker(input[0], 4));
};

(async () => await part1())();
