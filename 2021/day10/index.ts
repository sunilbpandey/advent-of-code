import { readInput } from "../../utils";

const charMap: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const scoreMap1: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const scoreMap2: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const firstIllegalCharacter = (line: string) => {
  const chunks: string[] = [];
  for (const ch of line.split("")) {
    if (ch in charMap) {
      chunks.unshift(ch);
    } else if (chunks.length && charMap[chunks[0]] === ch) {
      chunks.shift();
    } else {
      return { illegalChar: ch, chunks };
    }
  }
  return { illegalChar: "", chunks };
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let score = 0;
  input.forEach((line) => {
    const { illegalChar } = firstIllegalCharacter(line);
    if (illegalChar !== "") {
      score += scoreMap1[illegalChar];
    }
  });
  return score.toString();
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const scores: number[] = [];
  input.forEach((line) => {
    const { illegalChar, chunks } = firstIllegalCharacter(line);
    if (illegalChar === "" && chunks.length) {
      const score = chunks.reduce(
        (acc, cur) => acc * 5 + scoreMap2[charMap[cur]],
        0
      );
      scores.push(score);
    }
  });
  scores.sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2].toString();
};
