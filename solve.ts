export const solve = async (year: number, day: number, part: number): Promise<string> => {
  try {
    const { solve } = await import(`./${year.toString()}/day${day.toString().padStart(2, "0")}/part${part}`);
    return await solve();
  } catch {
    return "Not implemented yet";
  }
};
