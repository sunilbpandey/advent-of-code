import re
import subprocess


README_FILE="README.md"
TEMPLATE_FILE="templates/README.template"


def get_ts_solutions():
    solutions = {}
    result = subprocess.run('grep -Eor "export const part[12] =" 20* --include "*.ts"', shell=True, stdout=subprocess.PIPE)
    pat = re.compile('^(\d+)/day(\d+)/index.ts:export const part(\d) =$')
    for line in result.stdout.decode('utf-8').splitlines():
        m = pat.match(line)
        if m:
            year, day, part = m.groups()
            solutions.setdefault(year, {})
            solutions[year].setdefault(day, set())
            solutions[year][day].add(part)
    return solutions


def get_go_solutions():
    solutions = {}
    result = subprocess.run('grep -Eor "func Part[12]\(\)" 20* --include "*.go"', shell=True, stdout=subprocess.PIPE)
    pat = re.compile('^(\d+)/day(\d+)/day\d+.go:func Part(\d)\(\)$')
    for line in result.stdout.decode('utf-8').splitlines():
        m = pat.match(line)
        if m:
            year, day, part = m.groups()
            solutions.setdefault(year, {})
            solutions[year].setdefault(day, set())
            solutions[year][day].add(part)
    return solutions


def generate_progress_text(solutions):
    years = sorted(solutions.keys())

    # Header
    progress = "|     |" + "".join([f" {year}             |" for year in years])
    progress += "\n| --- |" + "".join([" ---------------- |" for _ in years])

    for d in range(1, 26):
        day = str.format('{:02d}', d)
        if not any(day in solutions[year] for year in solutions.keys()):
            continue
        progress += f"\n| {day}  |"
        for year in years:
            if day not in solutions[year]:
                progress += '                  |'
                continue
            stars = ('⭑' * len(solutions[year][day])).ljust(2)
            progress += f" [{stars}]({year}/day{day}) |"
    return progress


def main():
    solutions = get_go_solutions()
    for year, v in get_ts_solutions().items():
        solutions.setdefault(year, {})
        for d, parts in v.items():
            solutions[year].setdefault(d, set())
            solutions[year][d].update(parts)
    progress = generate_progress_text(solutions)

    with open(TEMPLATE_FILE, "r") as f:
        template = f.read()
    with open(README_FILE, "w") as f:
        f.write(template.replace("{{PROGRESS}}", progress))


if __name__ == "__main__":
    main()
