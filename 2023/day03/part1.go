package day03

import (
	_ "embed"
	"strconv"
	"unicode"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
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

	strutils.ForEachLine(content, func(_ int, line string) {
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
