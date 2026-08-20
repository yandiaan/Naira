$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
$compose = @('docker', 'compose', '-f', 'docker-compose.ci.yml')

& $compose[0] $compose[1..($compose.Length - 1)] up -d --build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
try {
  & $compose[0] $compose[1..($compose.Length - 1)] ps
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  pnpm exec playwright test
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  Push-Location services/api
  try {
    go test -tags=integration ./...
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  }
  finally {
    Pop-Location
  }
}
finally {
  & $compose[0] $compose[1..($compose.Length - 1)] logs --no-color
  & $compose[0] $compose[1..($compose.Length - 1)] down -v
}
