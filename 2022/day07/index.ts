import path from "path";
import { readInput } from "../../utils";

type DirSizes = { [key: string]: number };

const updateSize = (sizes: DirSizes, dir: string, size: number) => {
  sizes[dir] = (sizes[dir] || 0) + size;
};

const updateSizes = (sizes: DirSizes, cwd: string, size: number) => {
  // Update the current directory
  updateSize(sizes, cwd, size);
  if (cwd !== "/") {
    // Update all the parent directories
    cwd
      .split("/")
      .slice(1)
      .reduce((parent, dir) => {
        updateSize(sizes, parent, size);
        return path.resolve(parent, dir);
      }, "/");
  }
};

const loadSizes = (input: string[]) => {
  const sizes: DirSizes = {};
  let cwd = "";

  // Load the internal size of each directory
  // Ignore the file names, only consider the sizes
  input.forEach((line) => {
    const parts = line.split(" ");
    if (parts[0] === "$") {
      if (parts[1] === "cd") {
        cwd = path.resolve(cwd, parts[2]);
      }
    } else if (parts[0] !== "dir") {
      // This is a file listing
      // Add the file size to the current directory and all its parents
      updateSizes(sizes, cwd, parseInt(parts[0]));
    }
  });
  return sizes;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const dirs = loadSizes(input);
  return Object.values(dirs)
    .filter((size) => size <= 100000)
    .reduce((sum, cur) => sum + cur, 0)
    .toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const dirs = loadSizes(input);
  const sizeToRecover = 30000000 - 70000000 + dirs["/"];
  return Math.min(
    ...Object.values(dirs).filter((size) => size >= sizeToRecover)
  ).toString();
};
