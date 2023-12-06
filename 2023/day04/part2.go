package day04

import (
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

func Part2() string {
	total := 0
	cardsWon := []int{}
	strutils.ForEachLine(content, func(_ int, line string) {
		if len(line) == 0 {
			return
		}

		copies := 1
		if len(cardsWon) > 0 {
			copies += cardsWon[0]
			cardsWon = cardsWon[1:]
		}

		lineParts := strings.Split(line, ": ")

		numberParts := strings.Split(lineParts[1], " | ")
		winningNumbers := parseWinningNumbers(numberParts[0])
		count := countNumbersWon(winningNumbers, numberParts[1])

		for i := 0; i < len(cardsWon) && count > 0; i++ {
			cardsWon[i] += copies
			count--
		}

		for i := 0; i < count; i++ {
			cardsWon = append(cardsWon, copies)
		}

		total += copies
	})
	return strconv.Itoa(total)
}
