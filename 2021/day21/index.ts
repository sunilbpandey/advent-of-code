import { readInput } from "../../utils";

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const pos: number[] = [];
  pos.push(parseInt(input[0].split(": ")[1]));
  pos.push(parseInt(input[1].split(": ")[1]));
  const scores: number[] = [0, 0];

  for (let turn = 1; ; turn++) {
    const t3 = 3 * turn;
    const roll = ((t3 - 3) % 100) + ((t3 - 2) % 100) + ((t3 - 1) % 100) + 3;

    const player = (turn + 1) % 2;
    pos[player] = ((pos[player] + roll - 1) % 10) + 1;
    scores[player] += pos[player];
    if (scores[player] >= 1000) {
      return (scores[turn % 2] * turn * 3).toString();
    }
  }
};
