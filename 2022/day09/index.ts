import { readInput } from "../../utils";

type Point = {
  x: number;
  y: number;
};

const xdiff = (knot: Point, prev: Point) => Math.abs(prev.x - knot.x);
const ydiff = (knot: Point, prev: Point) => Math.abs(prev.y - knot.y);

const moveKnot = (knot: Point, prev: Point) => {
  if (knot.x === prev.x) {
    // Move north or south
    if (ydiff(knot, prev) > 1) {
      knot.y += prev.y > knot.y ? 1 : -1;
    }
  } else if (knot.y === prev.y) {
    // Move east or west
    if (xdiff(knot, prev) > 1) {
      knot.x += prev.x > knot.x ? 1 : -1;
    }
  } else if (prev.x < knot.x && prev.y > knot.y) {
    // Move northwest
    if (xdiff(knot, prev) > 1 || ydiff(knot, prev) > 1) {
      knot.x--;
      knot.y++;
    }
  } else if (prev.x > knot.x && prev.y > knot.y) {
    // Move northeast
    if (xdiff(knot, prev) > 1 || ydiff(knot, prev) > 1) {
      knot.x++;
      knot.y++;
    }
  } else if (prev.x > knot.x && prev.y < knot.y) {
    // Move southeast
    if (xdiff(knot, prev) > 1 || ydiff(knot, prev) > 1) {
      knot.x++;
      knot.y--;
    }
  } else if (prev.x < knot.x && prev.y < knot.y) {
    // Move southwest
    if (xdiff(knot, prev) > 1 || ydiff(knot, prev) > 1) {
      knot.x--;
      knot.y--;
    }
  }
};

export const part1 = async (): Promise<string> => {
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

export const part2 = async (): Promise<string> => {
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
  return visited.size.toString();
};
