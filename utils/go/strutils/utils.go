package strutils

import "strings"

func ForEachLine(content string, f func(int, string)) {
	for linenum, line := range strings.Split(content, "\n") {
		f(linenum, line)
	}
}
