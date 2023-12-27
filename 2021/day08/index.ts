import { readInput } from "../../utils";

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let count = 0;
  input.forEach((line) => {
    const outputValues = line.split(" | ")[1].split(" ");

    // 1 uses two segments, 4 uses four, 7 uses three and 8 uses seven
    // All othere digits use five or six segments
    count += outputValues.filter((s) => s.length <= 4 || s.length === 7).length;
  });
  return count.toString();
};

/*
The seven segments are:
  a
b   c
  d
e   f
  g

Segments corresponding to the 10 digits, sorted by number of segments:
1: cf,     7: acf,    4: bcdf,
5: abdfg,  2: acdeg,  3: acdfg,
9: abcdfg, 0: abcefg, 6: abdefg,
8: abcdefg

1, 4, 7 and 8 are easy to identify, and we can use those as the starting points.

Steps:
- Find "a": Take the 3-letter pattern (i.e. 7) and remove all the letters of the 2-letter pattern (i.e. 1) from it.
- Find "g": Take the 5-letter patterns and remove all letters of the 3-letter and 4-letter patterns from it.
            If only one letter is left, that is "g".
- Find "d": Take the 5-letter patterns and remove all letters of the 3-letter pattern, as well as the letter mapping to "g".
            If only one letter is left, that is "d".
- Find "e": Take the 5-letter patterns and remove all letters of the 4-letter pattern, as well as letters mapping to "a" and "g".
            If only one letter is left, that is "e".
- Find "b": Take the 4-letter pattern and remove all letters of the 2-letter pattern, as well as the letter mapping to "d".
- Find "f": Take the 6-letter patterns and remove all the letters found so far. If only one letter is left, that is "f".
- Find "c": The only letter still left.
*/

const deduceA = (patterns: string[]) => {
  const wires2 = patterns.filter((p) => p.length === 2)[0].split("");
  const wires3 = patterns.filter((p) => p.length === 3)[0].split("");
  return wires3.filter((ch) => !wires2.includes(ch))[0];
};

const deduceG = (patterns: string[]) => {
  const wires3 = patterns.filter((p) => p.length === 3)[0].split("");
  const wires4 = patterns.filter((p) => p.length === 4)[0].split("");
  const patterns5 = patterns.filter((p) => p.length === 5);
  for (const pattern of patterns5) {
    const wires = pattern
      .split("")
      .filter((ch) => !wires3.includes(ch) && !wires4.includes(ch));
    if (wires.length === 1) {
      return wires[0];
    }
  }
};

const deduceD = (mapping: Record<string, string>, patterns: string[]) => {
  const wires3 = patterns.filter((p) => p.length === 3)[0].split("");
  const patterns5 = patterns.filter((p) => p.length === 5);
  for (const pattern of patterns5) {
    const wires = pattern
      .split("")
      .filter((ch) => !mapping[ch])
      .filter((ch) => !wires3.includes(ch));
    if (wires.length === 1) {
      return wires[0];
    }
  }
};

const deduceE = (mapping: Record<string, string>, patterns: string[]) => {
  const wires4 = patterns.filter((p) => p.length === 4)[0].split("");
  const patterns5 = patterns.filter((p) => p.length === 5);
  for (const pattern of patterns5) {
    const wires = pattern
      .split("")
      .filter((ch) => !mapping[ch])
      .filter((ch) => !wires4.includes(ch));
    if (wires.length === 1) {
      return wires[0];
    }
  }
};

const deduceB = (mapping: Record<string, string>, patterns: string[]) => {
  const wires2 = patterns.filter((p) => p.length === 2)[0].split("");
  const wires4 = patterns
    .filter((p) => p.length === 4)[0]
    .split("")
    .filter((ch) => !mapping[ch] && !wires2.includes(ch));
  if (wires4.length === 1) {
    return wires4[0];
  }
};

const deduceF = (mapping: Record<string, string>, patterns: string[]) => {
  for (const pattern of patterns.filter((p) => p.length === 6)) {
    const wires = pattern.split("").filter((ch) => !mapping[ch]);
    if (wires.length === 1) {
      return wires[0];
    }
  }
};

const deduceC = (mapping: Record<string, string>, patterns: string[]) => {
  const wires2 = patterns
    .filter((p) => p.length === 2)[0]
    .split("")
    .filter((ch) => !mapping[ch]);
  if (wires2.length === 1) {
    return wires2[0];
  }
};

// Given a mapping of segments to correct segments, and a pattern, translate the pattern to a digit
const translate = (mapping: Record<string, string>, pattern: string) => {
  const translated = pattern
    .split("")
    .map((p) => mapping[p])
    .sort()
    .join("");
  switch (translated) {
    case "cf":
      return 1;
    case "acf":
      return 7;
    case "bcdf":
      return 4;
    case "abdfg":
      return 5;
    case "acdeg":
      return 2;
    case "acdfg":
      return 3;
    case "abcdfg":
      return 9;
    case "abcefg":
      return 0;
    case "abdefg":
      return 6;
    case "abcdefg":
      return 8;
    default:
      return null;
  }
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let sum = 0;
  input.forEach((line) => {
    const [input, output] = line.split(" | ");
    const patterns = input.split(" ");

    const mapping: Record<string, string> = {};
    mapping[deduceA(patterns)] = "a";
    mapping[deduceG(patterns)!] = "g";
    mapping[deduceE(mapping, patterns)!] = "e";
    mapping[deduceD(mapping, patterns)!] = "d";
    mapping[deduceB(mapping, patterns)!] = "b";
    mapping[deduceF(mapping, patterns)!] = "f";
    mapping[deduceC(mapping, patterns)!] = "c";

    sum += parseInt(
      output
        .split(" ")
        .map((pattern) => translate(mapping, pattern))
        .join("")
    );
  });
  return sum.toString();
};
