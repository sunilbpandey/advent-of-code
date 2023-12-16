package day15

import (
	_ "embed"
	"slices"
	"strconv"
	"strings"

	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func hash(s string) int {
	h := 0
	for _, c := range s {
		h = ((h + int(c)) * 17) % 256
	}
	return h
}

func Part1() string {
	sum := 0
	line, _ := strutils.Split2(content, "\n")
	for _, step := range strings.Split(line, ",") {
		sum += hash(step)
	}
	return strconv.Itoa(sum)
}

func Part2() string {
	boxes := make(map[int]Lenses)
	line, _ := strutils.Split2(content, "\n")
	for _, step := range strings.Split(line, ",") {
		if step[len(step)-1] == '-' {
			label := step[:len(step)-1]
			box := hash(label)
			if _, exists := boxes[box]; exists {
				index := boxes[box].Index(label)
				if index != -1 {
					boxes[box] = slices.Delete(boxes[box], index, index+1)
				}
			}
		} else {
			label, focalLength := strutils.Split2(step, "=")
			box := hash(label)
			if _, exists := boxes[box]; !exists {
				boxes[box] = []Lens{}
			}

			index := boxes[box].Index(label)
			if index != -1 {
				boxes[box][index].FocalLength = focalLength
			} else {
				boxes[box] = append(boxes[box], Lens{label, focalLength})
			}
		}
	}

	totalPower := 0
	for box, lenses := range boxes {
		totalPower += (box + 1) * lenses.FocusingPower()
	}
	return strconv.Itoa(totalPower)
}
