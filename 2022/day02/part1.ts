import { readInput } from "../../utils";
import { getOutcomeScore, shapeScore } from "./common";

export const part1 = async () => {
  const input = await readInput(__dirname);

  const score = input.reduce((score, line) => {
    const [opponent, self] = line.split(" ").map((s) => shapeScore[s]);

    // The score for a single round is the score for the shape you selected
    // plus the score for the outcome of the round
    return score + getOutcomeScore(opponent, self) + self;
  }, 0);
  console.log(score);
};

(async () => await part1())();
