import path from "path";

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

export const loadSizes = (input: string[]) => {
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
