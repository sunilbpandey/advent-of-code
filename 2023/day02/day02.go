package day02

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func parseLine(line string) (string, []map[string]int) {
	lineParts := strings.Split(line, ": ")

	sets := []map[string]int{}
	for _, set := range strings.Split(lineParts[1], "; ") {
		s := map[string]int{}
		for _, cube := range strings.Split(set, ", ") {
			parts := strings.SplitN(cube, " ", 2)
			count, color := intutils.Atoi(parts[0]), parts[1]
			s[color] = count
		}
		sets = append(sets, s)
	}
	return strings.Split(lineParts[0], " ")[1], sets
}

func Part1() string {
	maxCountPerColor := map[string]int{
		"red":   12,
		"green": 13,
		"blue":  14,
	}

	sum := 0
	strutils.ForEachLine(content, func(_ int, line string) {
		if len(line) == 0 {
			return
		}
		possible := true

		id, sets := parseLine(line)
		for _, set := range sets {
			for color, count := range set {
				if count > maxCountPerColor[color] {
					possible = false
				}
			}
		}
		if possible {
			sum += intutils.Atoi(id)
		}
	})
	return strconv.Itoa(sum)
}

func Part2() string {
	sum := 0
	strutils.ForEachLine(content, func(_ int, line string) {
		if len(line) == 0 {
			return
		}

		maxPerColor := map[string]int{
			"red":   0,
			"green": 0,
			"blue":  0,
		}

		_, sets := parseLine(line)
		for _, set := range sets {
			for color, count := range set {
				if count > maxPerColor[color] {
					maxPerColor[color] = count
				}
			}
		}

		product := 1
		for _, count := range maxPerColor {
			product *= count
		}
		sum += product
	})
	return strconv.Itoa(sum)
}
