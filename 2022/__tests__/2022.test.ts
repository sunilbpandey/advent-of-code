import { solve } from "../solve";

const solutions = [
  { day: 1, part: 1, solution: "67016" },
  { day: 1, part: 2, solution: "200116" },
  { day: 2, part: 1, solution: "14163" },
  { day: 2, part: 2, solution: "12091" },
  { day: 3, part: 1, solution: "7908" },
  { day: 3, part: 2, solution: "2838" },
  { day: 4, part: 1, solution: "605" },
  { day: 4, part: 2, solution: "914" },
  { day: 5, part: 1, solution: "DHBJQJCCW" },
  { day: 5, part: 2, solution: "WJVRLSJJT" },
  { day: 6, part: 1, solution: "1282" },
  { day: 6, part: 2, solution: "3513" },
  { day: 7, part: 1, solution: "1501149" },
  { day: 7, part: 2, solution: "10096985" },
  { day: 8, part: 1, solution: "1703" },
  { day: 8, part: 2, solution: "496650" },
  { day: 9, part: 1, solution: "6642" },
  { day: 9, part: 2, solution: "2765" },
  { day: 10, part: 1, solution: "13680" },
  {
    day: 10,
    part: 2,
    solution: `###..####..##..###..#..#.###..####.###..
#..#....#.#..#.#..#.#.#..#..#.#....#..#.
#..#...#..#....#..#.##...#..#.###..###..
###...#...#.##.###..#.#..###..#....#..#.
#....#....#..#.#....#.#..#....#....#..#.
#....####..###.#....#..#.#....####.###..`,
  },
  { day: 11, part: 1, solution: "54054" },
  { day: 11, part: 2, solution: "14314925001" },
];

describe("Advent of Code 2022", () => {
  test.each(solutions)(
    "Day $day Part $part",
    async ({ day, part, solution }) => {
      const result = await solve(day, part);
      expect(result).toBe(solution);
    }
  );
});
