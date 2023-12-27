export const solve = async (
  year: number,
  day: number,
  part: number
): Promise<string> => {
  try {
    const module = await import(
      `./${year.toString()}/day${day.toString().padStart(2, "0")}`
    );
    return await module[`part${part}`]();
  } catch {
    return "Not implemented yet";
  }
};
