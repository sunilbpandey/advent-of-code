import { readInput } from "../../utils";

/*
 The question hints that worry levels will reach ridiculous levels,
 and we need to find another way to keep them manageable.

 If we use the naive approach, the worry levels will quickly exceed
 integer limits, and even using BigInts will not be enough.

 To keep things manageable, we can use modular arithmetic.

 if a = b (mod n), then:
    a + c = b + c (mod n)
    and
    a * c = b * c (mod n)

 Notice that every "Test" divides the worry level by a different prime number.
 So instead of keeping track of item worry levels, we just need to keep track
 of worry levels modulo each of these prime numbers.

 */

class Monkey {
    items: number[][] = [];
    updateWorryLevel: Function = () => {};
    divisor = 0;
    nextIfTrue = 0;
    nextIfFalse = 0;

    getNextMonkey(worry: number): number {
        return worry % this.divisor === 0 ? this.nextIfTrue : this.nextIfFalse;
    }
}

export const solve = async (): Promise<string> => {
  const input = await readInput(__dirname);

    const monkeys: Monkey[] = [];

    // We can read this from the file, but it's easier to just hardcode it
    const divisors = [2, 3, 5, 7, 11, 13, 17, 19, 23];

    let monkey = new Monkey();
    input.forEach((line) => {
        const parts = line.trim().split(":");
        switch(parts[0]) {
            case "Starting items":
                const items = parts[1].trim().split(",").map(item => parseInt(item.trim()));
                monkey.items = items.map(item => divisors.map((divisor) => item % divisor));
                break;

            case "Operation":
                monkey.updateWorryLevel = new Function("old", `return ${parts[1].split("=")[1].trim()}`);
                break;
            
            case "Test":
                monkey.divisor = parseInt(parts[1].trim().substring("divisible by ".length));

            case "If true":
                monkey.nextIfTrue = parseInt(parts[1].trim().substring("throw to monkey ".length));
                break;

            case "If false":
                monkey.nextIfFalse = parseInt(parts[1].trim().substring("throw to monkey ".length));
                break;
    
            case "":
                monkeys.push(monkey);
                monkey = new Monkey();
        }
    });

    if (monkey.items.length > 0) {
        monkeys.push(monkey);
    }

    const inspections = Array(monkeys.length).fill(0);

    for (let round = 0; round < 10000; round++) {
        monkeys.forEach((monkey, index) => {
            monkey.items.forEach((item) => {
                item.forEach((remainder, index) => {
                    item[index] = monkey.updateWorryLevel(remainder) % divisors[index];
                });
                const nextMonkey = monkey.getNextMonkey(item[divisors.indexOf(monkey.divisor)]);
                monkeys[nextMonkey].items.push(item);
            });
            inspections[index] += monkey.items.length;
            monkey.items = [];
        });
    }

    inspections.sort((a, b) => b - a);
    return (inspections[0] * inspections[1]).toString();
};
