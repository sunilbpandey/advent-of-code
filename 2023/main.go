package main

import (
	"fmt"
	"os"

	"github.com/sunilbpandey/advent-of-code/2023/day01"
	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
)

type ProblemFunc func() string

var problems = map[int]map[int]ProblemFunc{
	1: {1: day01.Part1, 2: day01.Part2},
}

func main() {
	if len(os.Args) != 3 {
		panic("USAGE: go run main.go <day> <part>")
	}

	day := intutils.Atoi(os.Args[1])
	part := intutils.Atoi(os.Args[2])
	fmt.Println(problems[day][part]())
}
