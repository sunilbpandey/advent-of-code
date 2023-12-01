package aoc2023_test

import (
	"fmt"
	"testing"

	"github.com/sunilbpandey/advent-of-code/2023/day01"
)

type ProblemFunc func() string

type Problem struct {
	Func   ProblemFunc
	Answer string
}

var problems = map[int][]Problem{
	1: {{day01.Part1, "55172"}, {day01.Part2, "54925"}},
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
