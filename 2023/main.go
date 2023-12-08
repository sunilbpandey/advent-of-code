package main

import (
	"fmt"
	"os"

	"github.com/sunilbpandey/advent-of-code/2023/day01"
	"github.com/sunilbpandey/advent-of-code/2023/day02"
	"github.com/sunilbpandey/advent-of-code/2023/day03"
	"github.com/sunilbpandey/advent-of-code/2023/day04"
	"github.com/sunilbpandey/advent-of-code/2023/day05"
	"github.com/sunilbpandey/advent-of-code/2023/day06"
	"github.com/sunilbpandey/advent-of-code/2023/day07"
	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
)

type ProblemFunc func() string

var problems = map[int]map[int]ProblemFunc{
	1: {1: day01.Part1, 2: day01.Part2},
	2: {1: day02.Part1, 2: day02.Part2},
	3: {1: day03.Part1, 2: day03.Part2},
	4: {1: day04.Part1, 2: day04.Part2},
	5: {1: day05.Part1, 2: day05.Part2},
	6: {1: day06.Part1, 2: day06.Part2},
	7: {1: day07.Part1, 2: day07.Part2},
}

func main() {
	if len(os.Args) != 3 {
		panic("USAGE: go run main.go <day> <part>")
	}

	day := intutils.Atoi(os.Args[1])
	part := intutils.Atoi(os.Args[2])
	fmt.Println(problems[day][part]())
}
