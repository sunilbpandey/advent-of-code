import { solve } from "./solve"

(async () => {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.log("Usage: npx ts-node solve.ts <year> <day> <part>");
    process.exit(1);
  }

  console.log(await solve(parseInt(args[0]), parseInt(args[1]), parseInt(args[2])));
})();
