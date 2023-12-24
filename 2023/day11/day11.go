package day11

import (
	_ "embed"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
	"github.com/sunilbpandey/go-toolkit/point"
)

//go:embed input.txt
var content string

func parseGalaxies(expansion int) []point.Point {
	universe := [][]bool{}
	var colContainsGalaxy []bool
	rowContainsGalaxy := []bool{}
	strutils.ForEachLine(content, true, func(linenum int, line string) {
		rowContainsGalaxy = append(rowContainsGalaxy, false)
		row := make([]bool, len(line))
		if linenum == 0 {
			colContainsGalaxy = make([]bool, len(line))
		}
		for col, ch := range line {
			if ch == '#' {
				rowContainsGalaxy[linenum] = true
				colContainsGalaxy[col] = true
				row[col] = true
			}
		}

		universe = append(universe, row)
	})

	galaxies := []point.Point{}
	rowsAdded := 0
	for row := range universe {
		if !rowContainsGalaxy[row] {
			rowsAdded += expansion - 1
			continue
		}
		colsAdded := 0
		for col := range universe[row] {
			if !colContainsGalaxy[col] {
				colsAdded += expansion - 1
				continue
			}
			if universe[row][col] {
				galaxies = append(galaxies, point.NewPoint(row+rowsAdded, col+colsAdded))
			}
		}
	}
	return galaxies
}

func solve(expansion int) int {
	sum := 0
	galaxies := parseGalaxies(expansion)
	for i, a := range galaxies {
		for _, b := range galaxies[i+1:] {
			sum += a.Distance(b)
		}
	}
	return sum
}

func Part1() string {
	return strconv.Itoa(solve(2))
}

func Part2() string {
	return strconv.Itoa(solve(1000000))
}
