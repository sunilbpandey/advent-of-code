package strutils

import "strings"

func ForEachLine(content string, f func(string)) {
	for _, line := range strings.Split(content, "\n") {
		f(line)
	}
}
