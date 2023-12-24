package day15

import (
	"slices"

	"github.com/sunilbpandey/go-toolkit/intutils"
)

type Lens struct {
	Label       string
	FocalLength string
}

type Lenses []Lens

func (l Lenses) Index(label string) int {
	return slices.IndexFunc(l, func(l Lens) bool {
		return l.Label == label
	})
}

func (l Lenses) FocusingPower() int {
	power := 0
	for i := range l {
		power += (i + 1) * intutils.Atoi(l[i].FocalLength)
	}
	return power
}
