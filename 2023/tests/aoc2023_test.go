package aoc2023_test

import (
	"fmt"
	"testing"

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

type Problem struct {
	Func   types.ProblemFunc
	Answer string
}

var problems = map[int][]Problem{
	1:  {{day01.Part1, "55172"}, {day01.Part2, "54925"}},
	2:  {{day02.Part1, "2268"}, {day02.Part2, "63542"}},
	3:  {{day03.Part1, "535235"}, {day03.Part2, "79844424"}},
	4:  {{day04.Part1, "24706"}, {day04.Part2, "13114317"}},
	5:  {{day05.Part1, "579439039"}, {day05.Part2, "7873084"}},
	6:  {{day06.Part1, "2374848"}, {day06.Part2, "39132886"}},
	7:  {{day07.Part1, "248569531"}, {day07.Part2, "250382098"}},
	8:  {{day08.Part1, "13019"}},
	9:  {{day09.Part1, "1641934234"}, {day09.Part2, "975"}},
	10: {{day10.Part1, "6773"}, {day10.Part2, "493"}},
	11: {{day11.Part1, "9370588"}, {day11.Part2, "746207878188"}},
	13: {{day13.Part1, "29213"}, {day13.Part2, "37453"}},
	14: {{day14.Part1, "108935"}, {day14.Part2, "100876"}},
	15: {{day15.Part1, "510273"}, {day15.Part2, "212449"}},
	16: {{day16.Part1, "6883"}, {day16.Part2, "7228"}},
	18: {{day18.Part1, "42317"}, {day18.Part2, "83605563360288"}},
	21: {{day21.Part1, "3716"}},
}

func TestProblems(t *testing.T) {
	for day, p := range problems {
		for part, problem := range p {
			t.Run(fmt.Sprintf("day%02d part%d", day, part+1), func(t *testing.T) {
				if result := problem.Func(); result != problem.Answer {
					t.Errorf("expected: %s, got: %s", problem.Answer, result)
				}
			})
		}
	}
}
