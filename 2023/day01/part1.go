package day01

import (
	_ "embed"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func isDigit(c byte) bool {
	return c >= '0' && c <= '9'
}

func Part1() string {
	sum := 0
	strutils.ForEachLine(content, func(line string) {
		d1, d2 := -1, -1
		for _, c := range []byte(line) {
			if isDigit(c) {
				if d1 == -1 {
					d1 = int(c - '0')
				} else {
					d2 = int(c - '0')
				}
			}
		}
		if d2 == -1 {
			d2 = d1
		}
		sum += d1*10 + d2
	})
	return strconv.Itoa(sum)
}
