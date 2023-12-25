// Given a list of bit strings, return the most common bit at each position.
export const findMostCommonBits = (input: string[]): string[] => {
  // Count the number of 1s in each position
  // At the end, if the value at a position is greater than half the length of the initial array,
  // there were more 1s, otherwise there were more 0s.
  const countOfOnes: number[] = new Array(input[0].length).fill(0);
  input.forEach((line) => {
    line.split("").forEach((c, i) => {
      countOfOnes[i] += parseInt(c);
    });
  });
  return countOfOnes.map((c) => (c < input.length / 2 ? "0" : "1"));
};
