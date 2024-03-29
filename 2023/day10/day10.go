package day10

import (
	_ "embed"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

type Cell struct {
	Row  int
	Col  int
	Char rune
	Next *Cell
}

func newCell(row, col int, char rune) *Cell {
	return &Cell{row, col, char, nil}
}

func (cell *Cell) connectsToEast() bool {
	return cell.Char == '-' || cell.Char == 'F' || cell.Char == 'L'
}

func (cell *Cell) connectsToWest() bool {
	return cell.Char == '-' || cell.Char == '7' || cell.Char == 'J'
}

func (cell *Cell) connectsToNorth() bool {
	return cell.Char == '|' || cell.Char == 'J' || cell.Char == 'L'
}

func (cell *Cell) connectsToSouth() bool {
	return cell.Char == '|' || cell.Char == '7' || cell.Char == 'F'
}

type Grid [][]*Cell

func (g Grid) getEast(row, col int) *Cell {
	if col < len(g[row])-1 {
		return g[row][col+1]
	}
	return nil
}

func (g Grid) getWest(row, col int) *Cell {
	if col > 0 {
		return g[row][col-1]
	}
	return nil
}

func (g Grid) getNorth(row, col int) *Cell {
	if row > 0 {
		return g[row-1][col]
	}
	return nil
}

func (g Grid) getSouth(row, col int) *Cell {
	if row < len(g)-1 {
		return g[row+1][col]
	}
	return nil
}

func detectLoop(g Grid, start *Cell) {
	var next *Cell
	if start.Char == 'S' || start.connectsToEast() {
		east := g.getEast(start.Row, start.Col)
		if east != nil && east.Next == nil && east.connectsToWest() {
			next = east
		}
	}

	if next == nil {
		if start.Char == 'S' || start.connectsToNorth() {
			north := g.getNorth(start.Row, start.Col)
			if north != nil && north.Next == nil && north.connectsToSouth() {
				next = north
			}
		}
	}

	if next == nil {
		if start.Char == 'S' || start.connectsToSouth() {
			south := g.getSouth(start.Row, start.Col)
			if south != nil && south.Next == nil && south.connectsToNorth() {
				next = south
			}
		}
	}

	if next == nil {
		if start.Char == 'S' || start.connectsToWest() {
			west := g.getWest(start.Row, start.Col)
			if west != nil && west.Next == nil && west.connectsToEast() {
				next = west
			}
		}
	}

	if next != nil {
		start.Next = next
		detectLoop(g, next)
	}
}

func parseGrid() (Grid, *Cell) {
	var grid Grid
	var start *Cell
	strutils.ForEachLine(content, true, func(r int, line string) {
		row := []*Cell{}
		for c, char := range line {
			var cell *Cell
			if char != '.' {
				cell = newCell(r, c, char)
				if char == 'S' {
					start = cell
				}
			}
			row = append(row, cell)
		}
		grid = append(grid, row)
	})
	return grid, start
}

func Part1() string {
	grid, start := parseGrid()
	detectLoop(grid, start)

	length := 0
	node := start.Next
	for node != start && node != nil {
		length++
		node = node.Next
	}

	return strconv.Itoa((length + 1) / 2)
}

func Part2() string {
	grid, start := parseGrid()
	detectLoop(grid, start)

	loopCells := map[int]map[int]*Cell{}
	for node := start; node != nil; node = node.Next {
		if _, ok := loopCells[node.Row]; !ok {
			loopCells[node.Row] = map[int]*Cell{}
		}
		loopCells[node.Row][node.Col] = node
	}

	// source: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
	enclosedTiles := 0

	// no tile on the outside of the grid can be enclosed
	// so no need to check the first and last row and column
	for row := 1; row < len(grid)-1; row++ {
		for col := 1; col < len(grid[row])-1; col++ {
			if _, ok := loopCells[row][col]; ok {
				// point is on the loop
				continue
			}

			enclosed := false
			for j := col + 1; j < len(grid[row]); j++ {
				if _, ok := loopCells[row][j]; ok {
					// to avoid the case where the ray intersects at a vertex,
					// imagine the ray is traveling just slightly downwards from (row, col)
					// and ignore all pipes that are horizontal and extend upwards only
					ch := loopCells[row][j].Char
					if ch != '-' && ch != 'J' && ch != 'L' {
						enclosed = !enclosed
					}
				}
			}
			if enclosed {
				enclosedTiles++
			}
		}
	}
	return strconv.Itoa(enclosedTiles)
}
