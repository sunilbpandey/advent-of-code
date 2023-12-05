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
	strutils.ForEachLine(content, func(_ int, line string) {
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
