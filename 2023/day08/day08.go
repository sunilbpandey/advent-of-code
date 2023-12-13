package day08

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

type Move struct {
	Left  string
	Right string
}

func parseContent() (string, map[string]Move) {
	var instructions string
	nodes := make(map[string]Move)
	strutils.ForEachLine(content, true, func(linenum int, line string) {
		if linenum == 0 {
			instructions = line
			return
		}

		start, moves := strutils.Split2(line, " = ")
		left, right := strutils.Split2(strings.Trim(moves, "()"), ", ")
		nodes[start] = Move{left, right}
	})
	return instructions, nodes
}

func nextStep(nodes map[string]Move, current string, move byte) string {
	if move == 'L' {
		return nodes[current].Left
	}
	return nodes[current].Right
}

func Part1() string {
	instructions, nodes := parseContent()

	current := "AAA"
	for i := 0; ; i++ {
		current = nextStep(nodes, current, instructions[i%len(instructions)])
		if current == "ZZZ" {
			return strconv.Itoa(i + 1)
		}
	}
}
