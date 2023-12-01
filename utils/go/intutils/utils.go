package intutils

import (
	"strconv"

	"github.com/sunilbpandey/advent-of-code/utils/go/errorutils"
)

func Atoi(s string) int {
	i, err := strconv.Atoi(s)
	errorutils.Check(err)
	return i
}
