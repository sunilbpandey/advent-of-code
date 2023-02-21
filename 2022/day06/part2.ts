import { readInput } from "../../utils";
import { findMarker } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return findMarker(input[0], 14).toString();
};
