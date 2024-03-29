package day16

import "fmt"

type Beam struct {
	Row, Col int
	Dir      rune
}

func (b Beam) String() string {
	return fmt.Sprintf("%d,%d,%c", b.Row, b.Col, b.Dir)
}

func (b Beam) MoveUp() Beam {
	return Beam{b.Row - 1, b.Col, 'U'}
}

func (b Beam) MoveDown() Beam {
	return Beam{b.Row + 1, b.Col, 'D'}
}

func (b Beam) MoveLeft() Beam {
	return Beam{b.Row, b.Col - 1, 'L'}
}

func (b Beam) MoveRight() Beam {
	return Beam{b.Row, b.Col + 1, 'R'}
}

func (b Beam) Move(tile rune) []Beam {
	var updated []Beam
	switch tile {
	case '|':
		if b.Dir == 'R' || b.Dir == 'L' {
			updated = []Beam{b.MoveUp(), b.MoveDown()}
		} else if b.Dir == 'D' {
			updated = []Beam{b.MoveDown()}
		} else {
			updated = []Beam{b.MoveUp()}
		}
	case '-':
		if b.Dir == 'U' || b.Dir == 'D' {
			updated = []Beam{b.MoveLeft(), b.MoveRight()}
		} else if b.Dir == 'R' {
			updated = []Beam{b.MoveRight()}
		} else {
			updated = []Beam{b.MoveLeft()}
		}
	case '/':
		if b.Dir == 'U' {
			updated = []Beam{b.MoveRight()}
		} else if b.Dir == 'D' {
			updated = []Beam{b.MoveLeft()}
		} else if b.Dir == 'L' {
			updated = []Beam{b.MoveDown()}
		} else {
			updated = []Beam{b.MoveUp()}
		}
	case '\\':
		if b.Dir == 'U' {
			updated = []Beam{b.MoveLeft()}
		} else if b.Dir == 'D' {
			updated = []Beam{b.MoveRight()}
		} else if b.Dir == 'L' {
			updated = []Beam{b.MoveUp()}
		} else {
			updated = []Beam{b.MoveDown()}
		}
	default:
		if b.Dir == 'R' {
			updated = []Beam{b.MoveRight()}
		} else if b.Dir == 'D' {
			updated = []Beam{b.MoveDown()}
		} else if b.Dir == 'L' {
			updated = []Beam{b.MoveLeft()}
		} else {
			updated = []Beam{b.MoveUp()}
		}
	}
	return updated
}
