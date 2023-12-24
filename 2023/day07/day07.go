package day07

import (
	_ "embed"
	"sort"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
	"github.com/sunilbpandey/go-toolkit/intutils"
)

//go:embed input.txt
var content string

func sortHandsByRank(hands []Hand, i, j int, part2 bool) bool {
	if hands[i].Type(part2) != hands[j].Type(part2) {
		return hands[i].Type(part2) < hands[j].Type(part2)
	}
	for k := 0; k < len(hands[i].Cards); k++ {
		if hands[i].CardScore(k, part2) != hands[j].CardScore(k, part2) {
			return hands[i].CardScore(k, part2) < hands[j].CardScore(k, part2)
		}
	}
	return false
}

func parseLine(line string) (Hand, int) {
	hand, bid := strutils.Split2(line, " ")
	return Hand{Cards: hand}, intutils.Atoi(bid)
}

func Part1() string {
	bids := make(map[Hand]int)
	hands := []Hand{}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		hand, bid := parseLine(line)
		bids[hand] = bid
		hands = append(hands, hand)
	})
	sort.Slice(hands, func(i, j int) bool { return sortHandsByRank(hands, i, j, false) })

	winnings := 0
	for rank, hand := range hands {
		winnings += bids[hand] * (rank + 1)
	}
	return strconv.Itoa(winnings)
}

func Part2() string {
	bids := make(map[Hand]int)
	hands := []Hand{}
	strutils.ForEachLine(content, true, func(_ int, line string) {
		hand, bid := parseLine(line)
		bids[hand] = bid
		hands = append(hands, hand)
	})
	sort.Slice(hands, func(i, j int) bool { return sortHandsByRank(hands, i, j, true) })

	winnings := 0
	for rank, hand := range hands {
		winnings += bids[hand] * (rank + 1)
	}
	return strconv.Itoa(winnings)
}
