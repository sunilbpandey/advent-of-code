import { readInput } from "../../utils";

const shapeScore: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const getOutcomeScore = (opponent: number, self: number) => {
  // A, X = 1 = Rock
  // B, Y = 2 = Paper
  // C, Z = 3 = Scissors

  // Paper (2) beats Rock (1), Scissors (3) beats Paper (2), Rock (1) beats Scissors (3)
  if (opponent % 3 === self - 1) {
    return 6;
  }
  return opponent === self ? 3 : 0;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const score = input.reduce((score, line) => {
    const [opponent, self] = line.split(" ").map((s) => shapeScore[s]);

    // The score for a single round is the score for the shape you selected
    // plus the score for the outcome of the round
    return score + getOutcomeScore(opponent, self) + self;
  }, 0);
  return score.toString();
};

const makeChoice = (opponent: number, outcome: number) => {
  // outcome: -1 = lose, 0 = draw, 1 = win
  const choice = opponent + outcome;
  if (choice > 3) return 1;
  if (choice < 1) return 3;
  return choice;
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const score = input.reduce((score, line) => {
    const [opponent, outcome] = line.split(" ").map((s) => shapeScore[s]);
    const self = makeChoice(opponent, outcome - 2);
    return score + getOutcomeScore(opponent, self) + self;
  }, 0);
  return score.toString();
};
