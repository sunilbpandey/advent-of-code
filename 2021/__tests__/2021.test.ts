import { solve } from "../../solve";

const solutions = [
  { day: 1, part: 1, solution: "1233" },
  { day: 1, part: 2, solution: "1275" },
  { day: 2, part: 1, solution: "1989265" },
  { day: 2, part: 2, solution: "2089174012" },
  { day: 3, part: 1, solution: "3959450" },
  { day: 3, part: 2, solution: "7440311" },
  { day: 4, part: 1, solution: "69579" },
  { day: 4, part: 2, solution: "14877" },
  { day: 5, part: 1, solution: "5698" },
  { day: 5, part: 2, solution: "15463" },
  { day: 6, part: 1, solution: "390011" },
  { day: 6, part: 2, solution: "1746710169834" },
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
