package day09

import (
	_ "embed"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
	"github.com/sunilbpandey/go-toolkit/intutils"
)

//go:embed input.txt
var content string

func parseLine(line string) []int {
	var nums []int
	for _, s := range strings.Split(line, " ") {
		nums = append(nums, intutils.Atoi(s))
	}
	return nums
}

func computeDiffs(nums []int) []int {
	diffs := make([]int, len(nums)-1)
	for i := 1; i < len(nums); i++ {
		diffs[i-1] = nums[i] - nums[i-1]
	}
	return diffs
}

func allEqual(nums []int) bool {
	for _, n := range nums {
		if n != nums[0] {
			return false
		}
	}
	return true
}

func findNext(nums []int) int {
	diffs := computeDiffs(nums)
	if allEqual(diffs) {
		return nums[len(nums)-1] + diffs[0]
	}
	return nums[len(nums)-1] + findNext(diffs)
}

func findPrev(nums []int) int {
	diffs := computeDiffs(nums)
	if allEqual(diffs) {
		return nums[0] - diffs[0]
	}
	return nums[0] - findPrev(diffs)
}

func Part1() string {
	sum := 0
	strutils.ForEachLine(content, true, func(_ int, line string) {
		sum += findNext(parseLine(line))
	})
	return strconv.Itoa(sum)
}

func Part2() string {
	sum := 0
	strutils.ForEachLine(content, true, func(_ int, line string) {
		sum += findPrev(parseLine(line))
	})
	return strconv.Itoa(sum)
}
