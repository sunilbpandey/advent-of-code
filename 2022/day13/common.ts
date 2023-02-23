const isNumber = (value: any): boolean => typeof value === "number";

export const compare = (left: any[], right: any[]): number => {
  let i = 0;
  for (; i < left.length && i < right.length; i++) {
    if (isNumber(left[i]) && isNumber(right[i])) {
      if (left[i] === right[i]) {
        continue;
      }
      return left[i] < right[i] ? -1 : 1;
    } else {
      let result = 0;
      if (Array.isArray(left[i]) && Array.isArray(right[i])) {
        result = compare(left[i], right[i]);
      } else if (isNumber(left[i])) {
        result = compare([left[i]], right[i]);
      } else {
        result = compare(left[i], [right[i]]);
      }

      if (result === 0) {
        continue;
      }
      return result;
    }
  }

  if (left.length === right.length) {
    return 0;
  }
  return left.length < right.length ? -1 : 1;
};
