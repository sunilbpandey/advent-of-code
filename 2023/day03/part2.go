package day03

import (
	"fmt"
	"strconv"
	"unicode"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

func findOverlappingGears(linenum, index int, number string, prev map[int]string, curr map[int]string) []string {
	gears := []string{}
	for start, value := range prev {
		if value == "*" && overlaps(index, len(number), start) {
			gears = append(gears, fmt.Sprintf("%d,%d", linenum-1, start))
		}
	}
	for start, value := range curr {
		if value == "*" && overlaps(index, len(number), start) {
			gears = append(gears, fmt.Sprintf("%d,%d", linenum, start))
		}
	}
	return gears
}

func Part2() string {
	gears := make(map[string][]int)
	prev := make(map[int]string)
	strutils.ForEachLine(content, func(linenum int, line string) {
		if len(line) == 0 {
			return
		}

		curr := make(map[int]string)
		number := ""
		for i, c := range line {
			if unicode.IsDigit(c) {
				number += string(c)
			} else {
				if len(number) > 0 {
					g := findOverlappingGears(linenum, i-len(number), number, prev, curr)
					for _, key := range g {
						gears[key] = append(gears[key], intutils.Atoi(number))
					}
					curr[i-len(number)] = number
					number = ""
				}

				if c == '*' {
					for start, value := range prev {
						if startsNumber(value) && overlaps(start, len(value), i) {
							key := fmt.Sprintf("%d,%d", linenum, i)
							gears[key] = append(gears[key], intutils.Atoi(value))
						}
					}

					for start, value := range curr {
						if startsNumber(value) && overlaps(start, len(value), i) {
							key := fmt.Sprintf("%d,%d", linenum, i)
							gears[key] = append(gears[key], intutils.Atoi(value))
						}
					}
					curr[i] = string(c)
				}
			}
		}
		if len(number) > 0 {
			g := findOverlappingGears(linenum, len(line)-len(number), number, prev, curr)
			for _, key := range g {
				gears[key] = append(gears[key], intutils.Atoi(number))
			}
			curr[len(line)-len(number)] = number
		}
		prev = curr
	})

	sum := 0
	for _, values := range gears {
		if len(values) == 2 {
			sum += values[0] * values[1]
		}
	}
	return strconv.Itoa(sum)
}
