package year2023

import (
	"github.com/sunilbpandey/advent-of-code/2023/day01"
	"github.com/sunilbpandey/advent-of-code/2023/day02"
	"github.com/sunilbpandey/advent-of-code/2023/day03"
	"github.com/sunilbpandey/advent-of-code/2023/day04"
	"github.com/sunilbpandey/advent-of-code/2023/day05"
	"github.com/sunilbpandey/advent-of-code/2023/day06"
	"github.com/sunilbpandey/advent-of-code/2023/day07"
	"github.com/sunilbpandey/advent-of-code/2023/day08"
	"github.com/sunilbpandey/advent-of-code/2023/day09"
	"github.com/sunilbpandey/advent-of-code/2023/day10"
	"github.com/sunilbpandey/advent-of-code/2023/day11"
	"github.com/sunilbpandey/advent-of-code/2023/day13"
	"github.com/sunilbpandey/advent-of-code/2023/day14"
	"github.com/sunilbpandey/advent-of-code/2023/day15"
	"github.com/sunilbpandey/advent-of-code/2023/day16"
	"github.com/sunilbpandey/advent-of-code/2023/day18"
	"github.com/sunilbpandey/advent-of-code/2023/day21"
	"github.com/sunilbpandey/advent-of-code/utils/go/types"
)

type ProblemFunc func() string

var Problems = map[int]map[int]types.ProblemFunc{
	1:  {1: day01.Part1, 2: day01.Part2},
	2:  {1: day02.Part1, 2: day02.Part2},
	3:  {1: day03.Part1, 2: day03.Part2},
	4:  {1: day04.Part1, 2: day04.Part2},
	5:  {1: day05.Part1, 2: day05.Part2},
	6:  {1: day06.Part1, 2: day06.Part2},
	7:  {1: day07.Part1, 2: day07.Part2},
	8:  {1: day08.Part1},
	9:  {1: day09.Part1, 2: day09.Part2},
	10: {1: day10.Part1, 2: day10.Part2},
	11: {1: day11.Part1, 2: day11.Part2},
	13: {1: day13.Part1, 2: day13.Part2},
	14: {1: day14.Part1, 2: day14.Part2},
	15: {1: day15.Part1, 2: day15.Part2},
	16: {1: day16.Part1, 2: day16.Part2},
	18: {1: day18.Part1, 2: day18.Part2},
	21: {1: day21.Part1},
}
