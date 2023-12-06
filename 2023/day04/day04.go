package day04

import (
	_ "embed"
	"regexp"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func parseWinningNumbers(text string) map[string]bool {
	winningNumbers := map[string]bool{}
	for _, number := range regexp.MustCompile(`\s+`).Split(text, -1) {
		winningNumbers[number] = true
	}
	return winningNumbers
}

func countNumbersWon(winningNumbers map[string]bool, text string) int {
	count := 0
	for _, number := range regexp.MustCompile(`\s+`).Split(strings.TrimSpace(text), -1) {
		if winningNumbers[number] {
			count++
		}
	}
	return count
}

func Part1() string {
	sum := 0
	strutils.ForEachLine(content, func(_ int, line string) {
		_, cardData := strutils.Split2(line, ": ")
		winningNumbers, haveNumbers := strutils.Split2(cardData, " | ")
		count := countNumbersWon(parseWinningNumbers(winningNumbers), haveNumbers)
		if count > 0 {
			sum += intutils.Pow(2, count-1)
		}
	})
	return strconv.Itoa(sum)
}

func Part2() string {
	total := 0
	cardsWon := []int{}
	strutils.ForEachLine(content, func(_ int, line string) {
		copies := 1
		if len(cardsWon) > 0 {
			copies += cardsWon[0]
			cardsWon = cardsWon[1:]
		}

		_, cardData := strutils.Split2(line, ": ")

		winningNumbers, haveNumbers := strutils.Split2(cardData, " | ")
		count := countNumbersWon(parseWinningNumbers(winningNumbers), haveNumbers)

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
