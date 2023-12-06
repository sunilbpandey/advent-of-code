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
)

type ProblemFunc func() string

type Problem struct {
	Func   ProblemFunc
	Answer string
}

var problems = map[int][]Problem{
	1: {{day01.Part1, "55172"}, {day01.Part2, "54925"}},
	2: {{day02.Part1, "2268"}, {day02.Part2, "63542"}},
	3: {{day03.Part1, "535235"}, {day03.Part2, "79844424"}},
	4: {{day04.Part1, "24706"}, {day04.Part2, "13114317"}},
	5: {{day05.Part1, "579439039"}, {day05.Part2, "7873084"}},
	6: {{day06.Part1, "2374848"}, {day06.Part2, "39132886"}},
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
