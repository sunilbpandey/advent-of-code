package day03

import (
	_ "embed"
	"fmt"
	"strconv"
	"unicode"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
	"github.com/sunilbpandey/go-toolkit/intutils"
)

//go:embed input.txt
var content string

func overlaps(start, length, index int) bool {
	for i := index - 1; i <= index+1; i++ {
		if i >= start && i < start+length {
			return true
		}
	}
	return false
}

func startsNumber(s string) bool {
	return unicode.IsDigit(rune(s[0]))
}

func isPartNumber(index int, number string, prev map[int]string, curr map[int]string) bool {
	for start, value := range prev {
		if !startsNumber(value) && overlaps(index, len(number), start) {
			return true
		}
	}
	for start, value := range curr {
		if !startsNumber(value) && overlaps(index, len(number), start) {
			return true
		}
	}
	return false
}

func Part1() string {
	sum := 0
	prev := make(map[int]string)

	strutils.ForEachLine(content, true, func(_ int, line string) {
		curr := make(map[int]string)
		number := ""
		for i, c := range line {
			if unicode.IsDigit(c) {
				number += string(c)
			} else {
				if len(number) > 0 {
					if isPartNumber(i-len(number), number, prev, curr) {
						sum += intutils.Atoi(number)
					} else {
						curr[i-len(number)] = number
					}
					number = ""
				}

				if c != '.' {
					for start, value := range prev {
						if startsNumber(value) && overlaps(start, len(value), i) {
							sum += intutils.Atoi(value)
							delete(prev, start)
						}
					}

					for start, value := range curr {
						if startsNumber(value) && overlaps(start, len(value), i) {
							sum += intutils.Atoi(value)
							delete(curr, start)
						}
					}
					curr[i] = string(c)
				}
			}
		}
		if len(number) > 0 {
			if isPartNumber(len(line)-len(number), number, prev, curr) {
				sum += intutils.Atoi(number)
			} else {
				curr[len(line)-len(number)] = number
			}
		}

		prev = curr
	})
	return strconv.Itoa(sum)
}

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
	strutils.ForEachLine(content, true, func(linenum int, line string) {
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
