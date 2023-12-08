package day07

import (
	"sort"
	"strings"
)

type HandType int

const (
	HighCard     HandType = 0
	OnePair      HandType = 1
	TwoPair      HandType = 2
	ThreeOfAKind HandType = 3
	FullHouse    HandType = 4
	FourOfAKind  HandType = 5
	FiveOfAKind  HandType = 6
)

type Hand struct {
	Cards    string
	handType *HandType
}

type Cards []rune

func (c Cards) IsFiveOfAKind() bool {
	return c[0] == c[1] && c[1] == c[2] && c[2] == c[3] && c[3] == c[4]
}

func (c Cards) IsFourOfAKind() bool {
	return (c[0] == c[1] && c[1] == c[2] && c[2] == c[3]) || (c[1] == c[2] && c[2] == c[3] && c[3] == c[4])
}

func (c Cards) IsFullHouse() bool {
	return (c[0] == c[1] && c[1] == c[2] && c[3] == c[4]) || (c[0] == c[1] && c[2] == c[3] && c[3] == c[4])
}

func (c Cards) IsThreeOfAKind() bool {
	return (c[0] == c[1] && c[1] == c[2]) || (c[1] == c[2] && c[2] == c[3]) || (c[2] == c[3] && c[3] == c[4])
}

func (c Cards) IsTwoPair() bool {
	return (c[0] == c[1] && c[2] == c[3]) || (c[0] == c[1] && c[3] == c[4]) || (c[1] == c[2] && c[3] == c[4])
}

func (c Cards) IsOnePair() bool {
	return c[0] == c[1] || c[1] == c[2] || c[2] == c[3] || c[3] == c[4]
}

func (h Hand) CountJokers() int {
	return strings.Count(h.Cards, "J")
}

func (h Hand) SortedCards() Cards {
	cards := Cards([]rune(h.Cards))
	sort.Slice(cards, func(i, j int) bool { return cards[i] < cards[j] })
	return cards
}

func (h Hand) Type(part2 bool) HandType {
	if h.handType == nil {
		cards := h.SortedCards()
		handType := HighCard
		if cards.IsFiveOfAKind() {
			handType = FiveOfAKind
		} else if cards.IsFourOfAKind() {
			handType = FourOfAKind
		} else if cards.IsFullHouse() {
			handType = FullHouse
		} else if cards.IsThreeOfAKind() {
			handType = ThreeOfAKind
		} else if cards.IsTwoPair() {
			handType = TwoPair
		} else if cards.IsOnePair() {
			handType = OnePair
		}

		if part2 {
			jokers := h.CountJokers()
			switch handType {
			case FourOfAKind:
				if jokers > 0 {
					handType = FiveOfAKind
				}
			case FullHouse:
				if jokers > 0 {
					handType = FiveOfAKind
				}
			case ThreeOfAKind:
				if jokers > 0 {
					handType = FourOfAKind
				}
			case TwoPair:
				if jokers == 2 {
					handType = FourOfAKind
				} else if jokers == 1 {
					handType = FullHouse
				}
			case OnePair:
				if jokers > 0 {
					handType = ThreeOfAKind
				}
			case HighCard:
				if jokers == 1 {
					handType = OnePair
				}
			}
		}
		h.handType = &handType
	}
	return *h.handType
}

func (h Hand) CardScore(index int, part2 bool) int {
	c := h.Cards[index]
	switch c {
	case 'T':
		return 10
	case 'J':
		if part2 {
			return 1
		}
		return 11
	case 'Q':
		return 12
	case 'K':
		return 13
	case 'A':
		return 14
	}
	return int(c - '0')
}
