import { readInput } from "../../utils";
import { getOutcomeScore, shapeScore } from "./common";

const makeChoice = (opponent: number, outcome: number) => {
  // outcome: -1 = lose, 0 = draw, 1 = win
  const choice = opponent + outcome;
  if (choice > 3) return 1;
  if (choice < 1) return 3;
  return choice;
};

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const score = input.reduce((score, line) => {
    const [opponent, outcome] = line.split(" ").map((s) => shapeScore[s]);
    const self = makeChoice(opponent, outcome - 2);
    return score + getOutcomeScore(opponent, self) + self;
  }, 0);
  return score.toString();
};
