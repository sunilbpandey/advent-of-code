package day06

import (
	_ "embed"
	"math"
	"regexp"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func parseLine(line string) []int {
	_, data := strutils.Split2(line, ":")
	nums := []int{}
	for _, num := range regexp.MustCompile(`\s+`).Split(strings.TrimSpace(data), -1) {
		nums = append(nums, intutils.Atoi(num))
	}
	return nums
}

func countWays(time, distance int) int {
	// Let t be the time and d be the distance we are trying to beat
	// We can find the amount of time we must press the button, by solving:
	// x*(t - x) > d
	// Or, x^2 - tx + d < 0

	// This inequality will be satisfied for all values of x
	// between the two roots of the quadratic equation:
	// x^2 - tx + d = 0
	// i.e. (t +- sqrt(t^2 - 4d))/2

	// So we just need to calculate difference between these two roots

	t := float64(time)
	d := float64(distance)
	sqrt := math.Sqrt(t*t - 4*d)
	return int(math.Ceil((t+sqrt)/2) - math.Floor((t-sqrt)/2) - 1)
}

func Part1() string {
	lines := strings.Split(content, "\n")
	times := parseLine(lines[0])
	distances := parseLine(lines[1])

	product := 1
	for i := range times {
		product *= countWays(times[i], distances[i])
	}
	return strconv.Itoa(product)
}

func parseLinePart2(line string) int {
	_, data := strutils.Split2(line, ":")
	return intutils.Atoi(regexp.MustCompile(`\s+`).ReplaceAllString(data, ""))
}

func Part2() string {
	lines := strings.Split(content, "\n")
	time := parseLinePart2(lines[0])
	distance := parseLinePart2(lines[1])
	return strconv.Itoa(countWays(time, distance))
}
