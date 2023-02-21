export const solve = async (day: number, part: number): Promise<string> => {
  const { solve } = await import(
    `./day${day.toString().padStart(2, "0")}/part${part}`
  );
  return await solve();
};
