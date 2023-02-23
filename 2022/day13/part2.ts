import { readInput } from "../../utils";
import { compare } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

  const divider1 = [[2]];
  const divider2 = [[6]];
  const packets: any[] = [divider1, divider2];
  input.forEach((line, index) => {
    if (index % 3 < 2) {
      packets.push(JSON.parse(line));
    }
  });

  packets.sort(compare);
  const index1 =
    packets.findIndex(
      (packet) => JSON.stringify(packet) === JSON.stringify(divider1)
    ) + 1;
  const index2 =
    packets.findIndex(
      (packet) => JSON.stringify(packet) === JSON.stringify(divider2)
    ) + 1;
  return (index1 * index2).toString();
};
