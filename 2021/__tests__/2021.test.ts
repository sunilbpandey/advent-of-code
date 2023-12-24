import { solve } from "../../solve";

const solutions = [
  { day: 1, part: 1, solution: "1233" },
  { day: 1, part: 2, solution: "1275" },
];

describe("Advent of Code 2021", () => {
  test.each(solutions)(
    "Day $day Part $part",
    async ({ day, part, solution }) => {
      const result = await solve(2021, day, part);
      expect(result).toBe(solution);
    }
  );
});
