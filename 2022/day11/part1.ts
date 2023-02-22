import { readInput } from "../../utils";

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

    let monkey = new Monkey();
    input.forEach((line) => {
        const parts = line.trim().split(":");
        switch(parts[0]) {
            case "Starting items":
                monkey.items = parts[1].trim().split(",").map(item => parseInt(item.trim()));
                break;

            case "Operation":
                monkey.updateWorryLevel = new Function("old", `return Math.floor((${parts[1].split("=")[1].trim()}) / 3)`);
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

    for (let round = 0; round < 20; round++) {
        monkeys.forEach((monkey, index) => {
            monkey.items.forEach((item) => {
                const updatedWorryLevel = monkey.updateWorryLevel(item);
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
