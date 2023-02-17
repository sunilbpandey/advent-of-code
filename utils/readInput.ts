import { open } from "fs/promises";
import * as path from "path";

export const readInput = async (dir: string) => {
  const file = await open(path.resolve(dir, "./input.txt"));
  const lines: string[] = [];
  for await (const line of file.readLines()) {
    lines.push(line);
  }
  return lines;
};
