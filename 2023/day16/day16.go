package day16

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/go-toolkit/set"
)

//go:embed input.txt
var content string

func countEnergizedTiles(grid []string, beams []Beam) int {
	seen := set.NewSet[string]()
	energized := make(map[int]map[int]bool)
	for len(beams) > 0 {
		updated := []Beam{}
		for _, beam := range beams {
			if beam.Row < 0 || beam.Row >= len(grid) || beam.Col < 0 || beam.Col >= len(grid[0]) {
				continue
			}

			key := beam.String()
			if seen.Contains(key) {
				continue
			}
			seen.Add(key)

			if _, exists := energized[beam.Row]; !exists {
				energized[beam.Row] = make(map[int]bool)
			}
			energized[beam.Row][beam.Col] = true
			updated = append(updated, beam.Move(rune(grid[beam.Row][beam.Col]))...)
		}
		beams = updated
	}

	count := 0
	for _, row := range energized {
		count += len(row)
	}
	return count
}

func Part1() string {
	grid := strings.Split(content, "\n")
	if grid[len(grid)-1] == "" {
		grid = grid[:len(grid)-1]
	}

	return strconv.Itoa(countEnergizedTiles(grid, []Beam{{0, 0, 'R'}}))
}

func Part2() string {
	grid := strings.Split(content, "\n")
	if grid[len(grid)-1] == "" {
		grid = grid[:len(grid)-1]
	}

	count := 0
	for row := 0; row < len(grid); row++ {
		count = max(
			count,
			countEnergizedTiles(grid, []Beam{{row, 0, 'R'}}),
			countEnergizedTiles(grid, []Beam{{row, len(grid[0]) - 1, 'L'}}))
	}
	for col := 0; col < len(grid[0]); col++ {
		count = max(
			count,
			countEnergizedTiles(grid, []Beam{{0, col, 'D'}}),
			countEnergizedTiles(grid, []Beam{{len(grid) - 1, col, 'U'}}))
	}
	return strconv.Itoa(count)
}
