package day21

import (
	_ "embed"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
	"github.com/sunilbpandey/go-toolkit/set"
)

//go:embed input.txt
var content string

type Point struct {
	X, Y int
}

func parseGrid() ([][]rune, Point) {
	grid := [][]rune{}
	var start Point
	strutils.ForEachLine(content, true, func(linenum int, line string) {
		row := []rune{}
		for col, ch := range line {
			if ch == 'S' {
				start = Point{linenum, col}
				ch = '.'
			}
			row = append(row, ch)
		}
		grid = append(grid, row)
	})
	return grid, start
}

func Part1() string {
	grid, start := parseGrid()
	tiles := set.NewSet[Point](start)

	for steps := 0; steps < 64; steps++ {
		updated := set.NewSet[Point]()
		for _, t := range tiles.Members() {
			destinations := []Point{{t.X + 1, t.Y}, {t.X - 1, t.Y}, {t.X, t.Y + 1}, {t.X, t.Y - 1}}
			for _, d := range destinations {
				if d.X < 0 || d.X >= len(grid) || d.Y < 0 || d.Y >= len(grid[0]) || grid[d.X][d.Y] == '#' {
					continue
				}
				updated.Add(d)
			}
		}
		tiles = updated
	}
	return strconv.Itoa(tiles.Size())
}
