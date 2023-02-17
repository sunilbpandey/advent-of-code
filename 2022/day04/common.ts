// Given a range like "1-3", return [1, 2, 3]
export const expandRange = (range: string) => {
  const [start, end] = range.split("-").map((s) => parseInt(s));
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
