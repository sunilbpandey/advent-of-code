package intutils

import (
	"math"
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/errorutils"
)

func Atoi(s string) int {
	i, err := strconv.Atoi(s)
	errorutils.Check(err)
	return i
}

func Pow(a, b int) int {
	return int(math.Pow(float64(a), float64(b)))
}
