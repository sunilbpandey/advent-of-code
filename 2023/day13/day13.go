package day13

import (
	_ "embed"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func findVerticalMirror(lines []string, skip int) int {
	for i := 1; i < len(lines[0]); i++ {
		if i == skip {
			continue
		}
		reflects := true
		for j := 0; reflects && i-j-1 >= 0 && i+j < len(lines[0]); j++ {
			for _, line := range lines {
				if line[i-j-1] != line[i+j] {
					reflects = false
					break
				}
			}
		}
		if reflects {
			return i
		}
	}
	return 0
}

func findHorizontalMirror(lines []string, skip int) int {
	for i := 1; i < len(lines); i++ {
		if i == skip {
			continue
		}
		reflects := true
		for j := 0; reflects && i-j-1 >= 0 && i+j < len(lines); j++ {
			for k := 0; k < len(lines[0]); k++ {
				if lines[i-j-1][k] != lines[i+j][k] {
					reflects = false
					break
				}
			}
		}
		if reflects {
			return i
		}
	}
	return 0
}

func findMirror(lines []string, skipV, skipH int) (int, int) {
	mirror := findVerticalMirror(lines, skipV)
	if mirror > 0 {
		return mirror, 0
	}
	return 0, findHorizontalMirror(lines, skipH)
}

func Part1() string {
	sum := 0
	lines := []string{}
	strutils.ForEachLine(content, false, func(_ int, line string) {
		if line != "" {
			lines = append(lines, line)
			return
		}
		v, h := findMirror(lines, 0, 0)
		sum += v + 100*h
		lines = []string{}
	})
	return strconv.Itoa(sum)
}

func replacement(orig byte) byte {
	if orig == '#' {
		return '.'
	}
	return '#'
}

func flipAndFind(lines []string) (int, int) {
	origV, origH := findMirror(lines, 0, 0)
	for i := 0; i < len(lines); i++ {
		for j := 0; j < len(lines[0]); j++ {
			orig := lines[i][j]
			lines[i] = strutils.SetCharAt(lines[i], j, replacement(orig))
			v, h := findMirror(lines, origV, origH)
			if v > 0 || h > 0 {
				return v, h
			}
			lines[i] = strutils.SetCharAt(lines[i], j, orig)
		}
	}
	return 0, 0
}

func Part2() string {
	sum := 0
	lines := []string{}
	strutils.ForEachLine(content, false, func(_ int, line string) {
		if line != "" {
			lines = append(lines, line)
			return
		}
		v, h := flipAndFind(lines)
		sum += v + 100*h
		lines = []string{}
	})
	return strconv.Itoa(sum)
}
