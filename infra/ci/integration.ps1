$ErrorActionPreference = 'Stop'
$compose = @('docker', 'compose', '-f', 'docker-compose.ci.yml')

& $compose[0] $compose[1..($compose.Length - 1)] up -d --build
try {
  & $compose[0] $compose[1..($compose.Length - 1)] ps
  pnpm exec playwright test
  Push-Location services/api
  try {
    go test -tags=integration ./...
  }
  finally {
    Pop-Location
  }
}
finally {
  & $compose[0] $compose[1..($compose.Length - 1)] logs --no-color
  & $compose[0] $compose[1..($compose.Length - 1)] down -v
}
