package strutils

import "strings"

func ForEachLine(content string, skipEmpty bool, f func(int, string)) {
	for linenum, line := range strings.Split(content, "\n") {
		if line != "" || !skipEmpty {
			f(linenum, line)
		}
	}
}

func Split2(s string, sep string) (string, string) {
	parts := strings.SplitN(s, sep, 2)
	return parts[0], parts[1]
}

func SetCharAt(s string, i int, c byte) string {
	return s[:i] + string(c) + s[i+1:]
}
