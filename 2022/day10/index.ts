import { readInput } from "../../utils";

const calculateSignalStrength = (cycle: number, x: number): number => {
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    return x * cycle;
  }
  return 0;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  let x = 1;
  let cycle = 0;
  let strength = 0;
  input.forEach((line) => {
    if (line === "noop") {
      strength += calculateSignalStrength(++cycle, x);
    } else {
      strength += calculateSignalStrength(++cycle, x);
      strength += calculateSignalStrength(++cycle, x);
      x += parseInt(line.split(" ")[1]);
    }
  });
  return strength.toString();
};

type Pixel = {
  row: number;
  col: number;
};

const moveSprite = (sprite: number[], v: number) => {
  sprite.forEach((_, i) => (sprite[i] += v));
};

const drawPixel = (crt: string[][], pixel: Pixel, sprite: number[]) => {
  if (sprite.includes(pixel.col)) {
    crt[pixel.row][pixel.col] = "#";
  }
};

const movePixel = (pixel: Pixel) => {
  pixel.col++;
  if (pixel.col === 40) {
    pixel.col = 0;
    pixel.row++;
  }
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);

  // Current position of the sprite
  const sprite = [0, 1, 2];

  const crt = Array.from({ length: 6 }, () =>
    Array.from({ length: 40 }, () => ".")
  );

  // Current pixel being drawn
  const pixel: Pixel = { row: 0, col: 0 };

  input.forEach((line) => {
    if (line === "noop") {
      drawPixel(crt, pixel, sprite);
      movePixel(pixel);
    } else {
      drawPixel(crt, pixel, sprite);
      movePixel(pixel);

      drawPixel(crt, pixel, sprite);
      movePixel(pixel);

      moveSprite(sprite, parseInt(line.split(" ")[1]));
    }
  });
  return crt.map((row) => row.join("")).join("\n");
};
