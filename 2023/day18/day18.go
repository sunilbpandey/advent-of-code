package day18

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

type Point struct {
	X, Y int
}

func (p Point) Distance(q Point) int {
	return abs(p.X-q.X) + abs(p.Y-q.Y)
}

func computeArea(vertices []Point) int {
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
	return (abs(area)+perimeter)/2 + 1
}

func Part1() string {
	point := Point{0, 0}
	vertices := []Point{point}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		parts := strings.Split(line, " ")
		distance := intutils.Atoi(parts[1])
		switch parts[0] {
		case "R":
			point.X += distance
		case "L":
			point.X -= distance
		case "U":
			point.Y += distance
		case "D":
			point.Y -= distance
		}
		vertices = append(vertices, point)
	})
	return strconv.Itoa(computeArea(vertices))
}

func Part2() string {
	point := Point{0, 0}
	vertices := []Point{point}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		parts := strings.Split(line, "#")
		code := strings.TrimRight(parts[1], ")")
		distance, _ := strconv.ParseInt(code[:5], 16, 64)
		switch code[5] {
		case '0':
			point.X += int(distance)
		case '2':
			point.X -= int(distance)
		case '3':
			point.Y += int(distance)
		case '1':
			point.Y -= int(distance)
		}
		vertices = append(vertices, point)
	})
	return strconv.Itoa(computeArea(vertices))
}
