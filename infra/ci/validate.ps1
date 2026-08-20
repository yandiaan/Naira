$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true

function Assert-NativeSuccess {
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

pnpm exec commitlint --from=HEAD~1 --to=HEAD
Assert-NativeSuccess
pnpm exec prettier --check .
Assert-NativeSuccess
pnpm --filter @naira/design-tokens build
Assert-NativeSuccess
pnpm --filter @naira/design-tokens check
Assert-NativeSuccess
pnpm --filter @naira/design-tokens test
Assert-NativeSuccess
pnpm --filter @naira/ui-svelte check
Assert-NativeSuccess
pnpm --filter @naira/ui-svelte test
Assert-NativeSuccess
pnpm --filter site check
Assert-NativeSuccess
pnpm --filter workspace check
Assert-NativeSuccess
pnpm --filter @naira/api-contracts test
Assert-NativeSuccess
pnpm --filter @naira/api-contracts check
Assert-NativeSuccess

Push-Location services/api
try {
  $unformatted = gofmt -l .
  if ($unformatted) {
    throw "Go files need formatting: $($unformatted -join ', ')"
  }
  go test ./...
  Assert-NativeSuccess
  go vet ./...
  Assert-NativeSuccess
}
finally {
  Pop-Location
}
