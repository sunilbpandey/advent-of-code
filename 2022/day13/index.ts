import { readInput } from "../../utils";

const isNumber = (value: any): boolean => typeof value === "number";

const compare = (left: any[], right: any[]): number => {
  let i = 0;
  for (; i < left.length && i < right.length; i++) {
    if (isNumber(left[i]) && isNumber(right[i])) {
      if (left[i] === right[i]) {
        continue;
      }
      return left[i] < right[i] ? -1 : 1;
    } else {
      let result = 0;
      if (Array.isArray(left[i]) && Array.isArray(right[i])) {
        result = compare(left[i], right[i]);
      } else if (isNumber(left[i])) {
        result = compare([left[i]], right[i]);
      } else {
        result = compare(left[i], [right[i]]);
      }

      if (result === 0) {
        continue;
      }
      return result;
    }
  }

  if (left.length === right.length) {
    return 0;
  }
  return left.length < right.length ? -1 : 1;
};

export const part1 = async (): Promise<string> => {
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

export const part2 = async (): Promise<string> => {
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
