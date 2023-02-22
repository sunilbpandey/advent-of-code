import { readInput } from "../../utils";

/*
 The question hints that worry levels will reach ridiculous levels,
 and we need to find another way to keep them manageable.

 If we use the naive approach, the worry levels will quickly exceed
 integer limits, and even using BigInts will not be enough.

 To keep things manageable, we can use modular arithmetic.

 if x = a (mod n1), and
    x = b (mod n2), and
    x = c (mod n1 * n2)
    where n1 and n2 are coprime,

 then:
    a + k1 * n1 = c + k3 * n1 * n2
    c = a + n1 * (k1 - k3 * n2)
    c = a (mod n1)

 similarly:
    c = b (mod n2)

 This means, if we keep track of c, we can calculate a and b from it.

 Notice that every "Test" divides the worry level by a different prime number.
 So instead of keeping track of item worry levels, we just need to keep track
 of worry levels modulo the product of these prime numbers.
 */

class Monkey {
    items: number[] = [];
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
    const divisors: number[] = [];

    let monkey = new Monkey();
    input.forEach((line) => {
        const parts = line.trim().split(":");
        switch(parts[0]) {
            case "Starting items":
                monkey.items = parts[1].trim().split(",").map(item => parseInt(item.trim()));
                break;

            case "Operation":
                monkey.updateWorryLevel = new Function("old", `return ${parts[1].split("=")[1].trim()}`);
                break;
            
            case "Test":
                monkey.divisor = parseInt(parts[1].trim().substring("divisible by ".length));
                divisors.push(monkey.divisor);

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

    const product = divisors.reduce((a, b) => a * b, 1);
    monkeys.forEach((monkey) => {
        monkey.items.forEach((item, index) => {
            monkey.items[index] = item % product;
        });
    });

    const inspections = Array(monkeys.length).fill(0);

    for (let round = 0; round < 10000; round++) {
        monkeys.forEach((monkey, index) => {
            monkey.items.forEach((item) => {
                const updatedWorryLevel = monkey.updateWorryLevel(item) % product;
                const nextMonkey = monkey.getNextMonkey(updatedWorryLevel);
                monkeys[nextMonkey].items.push(updatedWorryLevel);
            });
            inspections[index] += monkey.items.length;
            monkey.items = [];
        });
    }

    inspections.sort((a, b) => b - a);
    return (inspections[0] * inspections[1]).toString();
};
