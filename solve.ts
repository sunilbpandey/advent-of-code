(async () => {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.log("Usage: npx ts-node solve.ts <year> <day> <part>");
    process.exit(1);
  }

  const { solve } = await import(`./${args[0]}/solve`);
  console.log(await solve(args[1], args[2]));
})();
