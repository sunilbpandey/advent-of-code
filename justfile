go year day part:
    go run main.go {{year}} {{day}} {{part}}

ts year day part:
    npx ts-node index.ts {{year}} {{day}} {{part}}

setup-go:
    go mod vendor

setup-ts:
    npm install

setup: setup-go setup-ts

test-go:
    go test -v ./... -count 1

test-ts:
    npm test

test: test-go test-ts