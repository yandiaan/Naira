$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true

pnpm exec commitlint --from=HEAD~1 --to=HEAD
pnpm exec prettier --check .
pnpm --filter @naira/design-tokens build
pnpm --filter @naira/design-tokens check
pnpm --filter @naira/design-tokens test
pnpm --filter @naira/ui-svelte check
pnpm --filter @naira/ui-svelte test
pnpm --filter site check
pnpm --filter workspace check
pnpm --filter @naira/api-contracts test
pnpm --filter @naira/api-contracts check

Push-Location services/api
try {
  $unformatted = gofmt -l .
  if ($unformatted) {
    throw "Go files need formatting: $($unformatted -join ', ')"
  }
  go test ./...
  go vet ./...
}
finally {
  Pop-Location
}
