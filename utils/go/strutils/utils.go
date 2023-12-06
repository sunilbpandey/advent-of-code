package strutils

import "strings"

func ForEachLine(content string, f func(int, string)) {
	for linenum, line := range strings.Split(content, "\n") {
		if line != "" {
			f(linenum, line)
		}
	}
}

func Split2(s string, sep string) (string, string) {
	parts := strings.SplitN(s, sep, 2)
	return parts[0], parts[1]
}
