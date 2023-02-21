import { readInput } from "../../utils";
import { moveKnot, Point } from "./common";

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);
  const head: Point = { x: 0, y: 0 };
  const tail: Point = { x: 0, y: 0 };

  const visited = new Set<string>();
  input.forEach((line) => {
    const [direction, distance] = line.split(" ");

    for (let i = 0; i < parseInt(distance); i++) {
      switch (direction) {
        case "R":
          head.x++;
          break;

        case "L":
          head.x--;
          break;

        case "U":
          head.y++;
          break;

        case "D":
          head.y--;
          break;
      }
      moveKnot(tail, head);
      visited.add(`${tail.x},${tail.y}`);
    }
  });
  return visited.size.toString();
};
