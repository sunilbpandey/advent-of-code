import { readInput } from "../../utils";

const isMarker = (s: string): boolean => {
  // Marker is a sequence of characters that are all different
  // Simply sort the characters and check if there are any duplicates
  const chars = s.split("").sort();
  return chars.findIndex((_, i) => chars[i] === chars[i - 1]) === -1;
};

const findMarker = (input: string, size: number) => {
  for (let i = size - 1; i < input.length; i++) {
    if (isMarker(input.slice(i - size + 1, i + 1))) {
      return i + 1;
    }
  }
  return -1;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return findMarker(input[0], 4).toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return findMarker(input[0], 14).toString();
};
