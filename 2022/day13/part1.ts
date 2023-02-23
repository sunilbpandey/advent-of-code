import { readInput } from "../../utils";
import { compare } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let packets: any[] = [];
  let correctOrderIndexSum = 0;
  input.forEach((line, index) => {
    if (index % 3 < 2) {
      packets.push(JSON.parse(line));
    } else {
      if (compare(packets[0], packets[1]) < 0) {
        correctOrderIndexSum += Math.floor(index / 3) + 1;
      }
      packets = [];
    }
  });
  if (packets.length > 1 && compare(packets[0], packets[1]) < 0) {
    correctOrderIndexSum += Math.floor(input.length / 3) + 1;
  }
  return correctOrderIndexSum.toString();
};
