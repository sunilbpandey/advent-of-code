package day05

import (
	_ "embed"
	"maps"
	"slices"
	"strconv"
	"strings"
	"unicode"

	"github.com/sunilbpandey/advent-of-code/utils/go/intutils"
	"github.com/sunilbpandey/advent-of-code/utils/go/strutils"
)

//go:embed input.txt
var content string

func parseMappings(lines []string) []RangePair {
	mappings := []RangePair{}
	for _, line := range lines {
		parts := strings.Split(line, " ")
		length := intutils.Atoi(parts[2])

		dest := Range{intutils.Atoi(parts[0]), length}
		src := Range{intutils.Atoi(parts[1]), length}

		mappings = append(mappings, RangePair{dest, src})
	}
	return mappings
}

func updateSeedsMap(lines []string, seeds map[int]int) map[int]int {
	mappings := parseMappings(lines)

	// Go through each seed and update the mapping to the next entity
	for seed, value := range seeds {
		for _, m := range mappings {
			if m.Src.Includes(value) {
				offset := value - m.Src.Start
				seeds[seed] = m.Dest.Start + offset
			}
		}
	}
	return seeds
}

func Part1() string {
	// Map from seed to current entity - soil, fertilizer, etc.
	seeds := make(map[int]int)

	lines := []string{}
	strutils.ForEachLine(content, true, func(linenum int, line string) {
		if linenum == 0 {
			for _, s := range strings.Split(strings.Split(line, ": ")[1], " ") {
				n := intutils.Atoi(s)
				seeds[n] = n
			}
			return
		}

		if unicode.IsDigit(rune(line[0])) {
			lines = append(lines, line)
			return
		}

		if len(lines) > 0 {
			seeds = updateSeedsMap(lines, seeds)
			lines = []string{}
		}
	})
	updateSeedsMap(lines, seeds)

	locations := make([]int, 0, len(seeds))
	for _, location := range seeds {
		locations = append(locations, location)
	}
	return strconv.Itoa(slices.Min(locations))
}

func extractOverlap(seed, value Range, mappings []RangePair) (map[Range]Range, map[Range]Range) {
	leftOver := make(map[Range]Range)
	for _, m := range mappings {
		if value.Overlaps(m.Src) {
			// Find the overlapping part of the ranges
			overlapStart := max(value.Start, m.Src.Start)
			overlapEnd := min(value.End(), m.Src.End())
			overlap := Range{overlapStart, overlapEnd - overlapStart + 1}

			newSeed := seed.Transform(overlap.Start-value.Start, overlap.Length)
			newValue := m.Dest.Transform(overlap.Start-m.Src.Start, overlap.Length)

			// Find parts before and after the overlap
			if value.Start < m.Src.Start {
				length := m.Src.Start - value.Start
				leftOver[seed.Transform(0, length)] = value.Transform(0, length)
			}
			if value.End() > m.Src.End() {
				offset := seed.Length - value.End() + overlapEnd
				length := value.End() - overlapEnd
				leftOver[seed.Transform(offset, length)] = value.Transform(offset, length)
			}
			return map[Range]Range{newSeed: newValue}, leftOver
		}
	}
	return map[Range]Range{seed: value}, leftOver
}

func updateSeedsMap2(lines []string, seeds map[Range]Range) map[Range]Range {
	mappings := parseMappings(lines)

	// Each seed range maps to a value range
	// When we map this value range to a mapping's source range,
	// some parts of the two ranges may overlap.
	// If this happens, we may have to split the value range into up to 3 parts:
	// 1. The part of the range before the overlap
	// 2. The part of the range that overlaps
	// 3. The part of the range after the overlap

	updatedSeeds := make(map[Range]Range)

	for seed, value := range seeds {
		toUpdate := make(map[Range]Range)
		toUpdate[seed] = value
		for len(toUpdate) > 0 {
			for seed, value := range toUpdate {
				delete(toUpdate, seed)
				updated, leftOver := extractOverlap(seed, value, mappings)
				maps.Copy(updatedSeeds, updated)
				maps.Copy(toUpdate, leftOver)
			}
		}
	}
	return updatedSeeds
}

func Part2() string {
	// Map from seed to current entity - soil, fertilizer, etc.
	seeds := make(map[Range]Range)

	lines := []string{}
	strutils.ForEachLine(content, true, func(linenum int, line string) {
		if linenum == 0 {
			numbers := strings.Split(strings.Split(line, ": ")[1], " ")
			for i := 0; i < len(numbers); i += 2 {
				start := intutils.Atoi(numbers[i])
				length := intutils.Atoi(numbers[i+1])
				seeds[Range{start, length}] = Range{start, length}
			}
			return
		}

		if unicode.IsDigit(rune(line[0])) {
			lines = append(lines, line)
			return
		}

		if len(lines) > 0 {
			seeds = updateSeedsMap2(lines, seeds)
			lines = []string{}
		}
	})
	seeds = updateSeedsMap2(lines, seeds)

	minLocation := -1
	for _, location := range seeds {
		if minLocation == -1 || location.Start < minLocation {
			minLocation = location.Start
		}
	}
	return strconv.Itoa(minLocation)
}
