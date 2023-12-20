package day14

import (
	_ "embed"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

const (
	Cube  = '#'
	Empty = '.'
	Round = 'O'
)

func tiltNorth(grid [][]rune) {
	for j := 0; j < len(grid[0]); j++ {
		for s := 0; s < len(grid); {
			// Move start to first empty
			if grid[s][j] != Empty {
				s++
				continue
			}

			// Move up all the rounds until we reach a cube
			e := s + 1
			for ; e < len(grid); e++ {
				if grid[e][j] == Cube {
					break
				}
				if grid[e][j] == Round {
					grid[s][j] = Round
					grid[e][j] = Empty
					s++
				}
			}

			if e == len(grid) {
				break
			}
			s = e + 1
		}
	}
}

func tiltWest(grid [][]rune) {
	for i := 0; i < len(grid); i++ {
		for s := 0; s < len(grid[0]); {
			// Move start to first empty
			if grid[i][s] != Empty {
				s++
				continue
			}

			// Move left all the rounds until we reach a cube
			e := s + 1
			for ; e < len(grid[0]); e++ {
				if grid[i][e] == Cube {
					break
				}
				if grid[i][e] == Round {
					grid[i][s] = Round
					grid[i][e] = Empty
					s++
				}
			}

			if e == len(grid[0]) {
				break
			}
			s = e + 1
		}
	}
}

func tiltSouth(grid [][]rune) {
	// Move all cubes of shape Round up
	for j := 0; j < len(grid[0]); j++ {
		for s := len(grid) - 1; s >= 0; {
			// Move start to first empty
			if grid[s][j] != Empty {
				s--
				continue
			}

			// Move down all the rounds until we reach a cube
			e := s - 1
			for ; e >= 0; e-- {
				if grid[e][j] == Cube {
					break
				}
				if grid[e][j] == Round {
					grid[s][j] = Round
					grid[e][j] = Empty
					s--
				}
			}

			if e < 0 {
				break
			}
			s = e - 1
		}
	}
}

func tiltEast(grid [][]rune) {
	for i := 0; i < len(grid); i++ {
		for s := len(grid[0]) - 1; s >= 0; {
			// Move start to first empty
			if grid[i][s] != Empty {
				s--
				continue
			}

			// Move right all the rounds until we reach a cube
			e := s - 1
			for ; e >= 0; e-- {
				if grid[i][e] == Cube {
					break
				}
				if grid[i][e] == Round {
					grid[i][s] = Round
					grid[i][e] = Empty
					s--
				}
			}

			if e < 0 {
				break
			}
			s = e - 1
		}
	}
}

func parseGrid() [][]rune {
	grid := [][]rune{}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		grid = append(grid, []rune(line))
	})
	return grid
}

func calculateLoad(grid [][]rune) int {
	totalLoad := 0
	for i := range grid {
		count := 0
		for j := range grid[i] {
			if grid[i][j] == Round {
				count++
			}
		}
		totalLoad += count * (len(grid) - i)
	}
	return totalLoad
}

func hash(grid [][]rune) string {
	h := ""
	for _, row := range grid {
		h += string(row)
	}
	return h
}

func Part1() string {
	grid := parseGrid()
	tiltNorth(grid)
	return strconv.Itoa(calculateLoad(grid))
}

func Part2() string {
	grid := parseGrid()

	limit := 1000000000
	seen := map[string]int{}
	for i := 0; i < limit; i++ {
		tiltNorth(grid)
		tiltWest(grid)
		tiltSouth(grid)
		tiltEast(grid)

		h := hash(grid)
		if _, exists := seen[h]; !exists {
			seen[h] = i
			continue
		}

		// We have found a cycle (no pun intended)
		// Keep going until we find the iteration where the
		// remaining iterations are a multiple of the cycle length
		cycleLength := i - seen[h]
		if (limit-1-seen[h])%cycleLength == 0 {
			break
		}
	}
	return strconv.Itoa(calculateLoad(grid))
}
