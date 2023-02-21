import { readInput } from "../../utils";
import { getOutcomeScore, shapeScore } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const score = input.reduce((score, line) => {
    const [opponent, self] = line.split(" ").map((s) => shapeScore[s]);

    // The score for a single round is the score for the shape you selected
    // plus the score for the outcome of the round
    return score + getOutcomeScore(opponent, self) + self;
  }, 0);
  return score.toString();
};
