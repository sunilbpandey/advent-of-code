package day04

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func parseWinningNumbers(text string) map[string]bool {
	winningNumbers := map[string]bool{}
	for _, number := range strings.Split(text, " ") {
		number = strings.TrimSpace(number)
		if number == "" {
			continue
		}
		winningNumbers[number] = true
	}
	return winningNumbers
}

func countNumbersWon(winningNumbers map[string]bool, text string) int {
	count := 0
	for _, number := range strings.Split(text, " ") {
		number = strings.TrimSpace(number)
		if number == "" {
			continue
		}
		if winningNumbers[number] {
			count++
		}
	}
	return count
}

func Part1() string {
	sum := 0
	strutils.ForEachLine(content, func(_ int, line string) {
		if len(line) == 0 {
			return
		}

		lineParts := strings.Split(line, ": ")

		numberParts := strings.Split(lineParts[1], " | ")
		winningNumbers := parseWinningNumbers(numberParts[0])
		count := countNumbersWon(winningNumbers, numberParts[1])

		if count > 0 {
			sum += intutils.Pow(2, count-1)
		}
	})
	return strconv.Itoa(sum)
}
