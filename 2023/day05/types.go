package day05

type Range struct {
	Start  int
	Length int
}

func (r Range) End() int {
	return r.Start + r.Length - 1
}

func (r Range) Transform(offset, length int) Range {
	return Range{r.Start + offset, length}
}

func (r1 Range) Overlaps(r2 Range) bool {
	return r1.Start <= r2.Start+r2.Length-1 && r2.Start <= r1.Start+r1.Length-1
}

func (r Range) Includes(point int) bool {
	return point >= r.Start && point <= r.End()
}

type RangePair struct {
	Dest Range
	Src  Range
}
