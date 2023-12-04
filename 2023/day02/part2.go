package day02

import (
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

func Part2() string {
	sum := 0
	strutils.ForEachLine(content, func(line string) {
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
