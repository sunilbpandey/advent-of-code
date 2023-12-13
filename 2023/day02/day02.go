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
	gameInfo, gameData := strutils.Split2(line, ": ")

	sets := []map[string]int{}
	for _, set := range strings.Split(gameData, "; ") {
		s := map[string]int{}
		for _, cube := range strings.Split(set, ", ") {
			count, color := strutils.Split2(cube, " ")
			s[color] = intutils.Atoi(count)
		}
		sets = append(sets, s)
	}
	return strings.Split(gameInfo, " ")[1], sets
}

func Part1() string {
	maxCountPerColor := map[string]int{
		"red":   12,
		"green": 13,
		"blue":  14,
	}

	sum := 0
	strutils.ForEachLine(content, true, func(_ int, line string) {
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
	strutils.ForEachLine(content, true, func(_ int, line string) {
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
