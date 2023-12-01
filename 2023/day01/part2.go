package day01

import (
	_ "embed"
	"strconv"
	"unicode"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

func Part2() string {
	names := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	sum := 0
	strutils.ForEachLine(content, func(line string) {
		d1, d2 := -1, -1
		for i, c := range line {
			if unicode.IsDigit(c) {
				setDigits(&d1, &d2, int(c-'0'))
			} else {
				for j, name := range names {
					if i+len(name) <= len(line) && line[i:i+len(name)] == name {
						setDigits(&d1, &d2, j+1)
					}
				}
			}
		}
		sum += d1*10 + d2
	})
	return strconv.Itoa(sum)
}
