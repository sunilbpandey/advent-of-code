import { readInput } from "../../utils";
import { moveKnot, Point } from "./common";

export const part2 = async () => {
  const input = await readInput(__dirname);

  const rope: Point[] = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));

  const visited = new Set<string>();
  input.forEach((line) => {
    const [direction, distance] = line.split(" ");

    for (let i = 0; i < parseInt(distance); i++) {
      switch (direction) {
        case "R":
          rope[0].x++;
          break;

        case "L":
          rope[0].x--;
          break;

        case "U":
          rope[0].y++;
          break;

        case "D":
          rope[0].y--;
          break;
      }

      for (let j = 1; j < rope.length; j++) {
        moveKnot(rope[j], rope[j - 1]);
      }
      visited.add(`${rope[rope.length - 1].x},${rope[rope.length - 1].y}`);
    }
  });
  console.log(visited.size);
};

(async () => await part2())();
