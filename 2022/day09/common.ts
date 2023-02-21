export type Point = {
  x: number;
  y: number;
};

const xdiff = (knot: Point, prev: Point) => Math.abs(prev.x - knot.x);
const ydiff = (knot: Point, prev: Point) => Math.abs(prev.y - knot.y);

export const moveKnot = (knot: Point, prev: Point) => {
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
