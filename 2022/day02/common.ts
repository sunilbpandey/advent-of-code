export const shapeScore: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

export const getOutcomeScore = (opponent: number, self: number) => {
  // A, X = 1 = Rock
  // B, Y = 2 = Paper
  // C, Z = 3 = Scissors

  // Paper (2) beats Rock (1), Scissors (3) beats Paper (2), Rock (1) beats Scissors (3)
  if (opponent % 3 === self - 1) {
    return 6;
  }
  return opponent === self ? 3 : 0;
};
