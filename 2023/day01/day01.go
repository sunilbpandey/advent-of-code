package day01

import (
	_ "embed"
	"strconv"
	"unicode"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func setDigits(d1, d2 *int, value int) {
	if *d1 == -1 {
		*d1 = value
	}
	*d2 = value
}

func Part1() string {
	sum := 0
	strutils.ForEachLine(content, true, func(_ int, line string) {
		d1, d2 := -1, -1
		for _, c := range line {
			if unicode.IsDigit(c) {
				setDigits(&d1, &d2, int(c-'0'))
			}
		}
		sum += d1*10 + d2
	})
	return strconv.Itoa(sum)
}

func Part2() string {
	names := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	sum := 0
	strutils.ForEachLine(content, true, func(_ int, line string) {
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
