package day01

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

func Part2() string {
	numbers := []string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	sum := 0
	strutils.ForEachLine(content, func(line string) {
		d1, i1 := -1, len(line)
		d2, i2 := -1, -1
		for d, num := range numbers {
			if i := strings.Index(line, num); i != -1 {
				if i < i1 {
					d1, i1 = d, i
				}
			}

			if i := strings.LastIndex(line, num); i != -1 {
				if i > i2 {
					d2, i2 = d, i
				}
			}
		}
		if d1 > 9 {
			d1 -= 9
		}
		if d2 > 9 {
			d2 -= 9
		}
		sum += d1*10 + d2
	})
	return strconv.Itoa(sum)
}
