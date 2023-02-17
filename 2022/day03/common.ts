const LOWER_A = "a".charCodeAt(0);
const UPPER_A = "A".charCodeAt(0);

export const getItemPriority = (item: string) => {
  if (item >= "a" && item <= "z") {
    return item.charCodeAt(0) - LOWER_A + 1;
  }

  if (item >= "A" && item <= "Z") {
    return item.charCodeAt(0) - UPPER_A + 27;
  }
  throw new Error(`Unknown item ${item}`);
};

export const getUniqueChars = (str: string) => new Set(Array.from(str));
