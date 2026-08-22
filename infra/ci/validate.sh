#!/usr/bin/env sh
set -eu

pnpm exec commitlint --from=HEAD~1 --to=HEAD
pnpm exec prettier --check .
task docs:check
task ui:check
task ui:a11y
task ui:visual
task web:test:e2e
pnpm --filter @naira/design-tokens build
pnpm --filter @naira/design-tokens check
pnpm --filter @naira/design-tokens test
pnpm --filter @naira/ui-svelte check
pnpm --filter @naira/ui-svelte test
pnpm --filter site check
pnpm --filter workspace check
pnpm --filter @naira/api-contracts test
pnpm --filter @naira/api-contracts check

(
  cd services/api
  test -z "$(gofmt -l .)"
  go test ./...
  go vet ./...
)
