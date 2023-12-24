package day18

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
	"github.com/sunilbpandey/go-toolkit/intutils"
	"github.com/sunilbpandey/go-toolkit/point"
)

//go:embed input.txt
var content string

func computeArea(vertices []point.Point) int {
	// Green's theorem can be used to calculate area
	// https://en.wikipedia.org/wiki/Green%27s_theorem#Area_calculation
	// See also: https://en.wikipedia.org/wiki/Shoelace_formula
	area := 0
	perimeter := 0
	for i := 0; i < len(vertices)-1; i++ {
		area += vertices[i].X*vertices[i+1].Y - vertices[i+1].X*vertices[i].Y
		perimeter += vertices[i].Distance(vertices[i+1])
	}

	// But, we also need to account for the width of the edges

	// Pick's theorem (https://en.wikipedia.org/wiki/Pick%27s_theorem) gives us:
	// A = i + b/2 - 1

	// We know A and b, so we can solve for i:
	// i = A - b/2 + 1

	// In our case, we want i + b, so:
	// i + b = A + b/2 + 1
	return (intutils.Abs(area)+perimeter)/2 + 1
}

func Part1() string {
	p := point.NewPoint(0, 0)
	vertices := []point.Point{p}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		parts := strings.Split(line, " ")
		distance := intutils.Atoi(parts[1])
		switch parts[0] {
		case "R":
			p.X += distance
		case "L":
			p.X -= distance
		case "U":
			p.Y += distance
		case "D":
			p.Y -= distance
		}
		vertices = append(vertices, p)
	})
	return strconv.Itoa(computeArea(vertices))
}

func Part2() string {
	p := point.NewPoint(0, 0)
	vertices := []point.Point{p}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		parts := strings.Split(line, "#")
		code := strings.TrimRight(parts[1], ")")
		distance, _ := strconv.ParseInt(code[:5], 16, 64)
		switch code[5] {
		case '0':
			p.X += int(distance)
		case '2':
			p.X -= int(distance)
		case '3':
			p.Y += int(distance)
		case '1':
			p.Y -= int(distance)
		}
		vertices = append(vertices, p)
	})
	return strconv.Itoa(computeArea(vertices))
}
