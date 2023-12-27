import { readInput } from "../../utils";

type Map = Record<string, string[]>;

const loadMap = (input: string[]) => {
  const map: Map = {};
  input.forEach((line) => {
    const [a, b] = line.split("-");
    if (!map[a]) map[a] = [];
    if (!map[b]) map[b] = [];

    // Visiting start cave a second time is not allowed
    if (b !== "start") map[a].push(b);
    if (a !== "start") map[b].push(a);
  });
  return map;
};

const countDistinctPaths1 = (map: Map, currentPath: string[], node: string) => {
  if (node === "end") {
    return 1;
  }

  let paths = 0;
  for (const neighbour of map[node]) {
    if (neighbour.match(/[a-z]+/) && currentPath.includes(neighbour)) {
      // This is a small cave that has already been visited, skip.
      continue;
    }
    paths += countDistinctPaths1(map, currentPath.concat(node), neighbour);
  }
  return paths;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return countDistinctPaths1(loadMap(input), [], "start").toString();
};

const countDistinctPaths2 = (
  map: Map,
  currentPath: string[],
  node: string,
  smallCaveVisitedTwice: boolean
) => {
  if (node === "end") {
    return 1;
  }

  let paths = 0;
  for (const neighbour of map[node]) {
    if (neighbour.match(/[a-z]+/) && currentPath.includes(neighbour)) {
      // This is a small cave that has already been visited
      if (!smallCaveVisitedTwice) {
        paths += countDistinctPaths2(
          map,
          currentPath.concat(node),
          neighbour,
          true
        );
      }
      continue;
    }
    paths += countDistinctPaths2(
      map,
      currentPath.concat(node),
      neighbour,
      smallCaveVisitedTwice
    );
  }
  return paths;
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  return countDistinctPaths2(loadMap(input), [], "start", false).toString();
};
