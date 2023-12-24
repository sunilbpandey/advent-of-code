package main

import (
	"fmt"
	"os"

	year2023 "github.com/sunilbpandey/advent-of-code/2023"
	"github.com/sunilbpandey/advent-of-code/utils/go/types"
	"github.com/sunilbpandey/go-toolkit/intutils"
)

var years = map[string]map[int]map[int]types.ProblemFunc{
	"2023": year2023.Problems,
}

func validateArgs(year string, day, part int) {
	if day < 1 || day > 25 || part < 1 || part > 2 {
		fmt.Printf("Invalid day %d or part %d\n", day, part)
		os.Exit(2)
	}

	if _, exists := years[year][day][part]; !exists {
		fmt.Printf("%s day%02d part%d not found\n", year, day, part)
		os.Exit(2)
	}
}

func main() {
	if len(os.Args) != 4 {
		fmt.Println("USAGE: go run main.go <year> <day> <part>")
		os.Exit(1)
	}

	year := os.Args[1]
	day := intutils.Atoi(os.Args[2])
	part := intutils.Atoi(os.Args[3])

	validateArgs(year, day, part)
	fmt.Println(years[year][day][part]())
}
