$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
if (-not (Get-Command trivy -ErrorAction SilentlyContinue)) {
  throw 'Trivy is required for security checks.'
}
$version = if ($env:APP_VERSION) { $env:APP_VERSION } else { '0.1.0-dev' }

trivy fs --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
trivy image --exit-code 1 --severity HIGH,CRITICAL "naira-api:$version"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
trivy image --exit-code 1 --severity HIGH,CRITICAL "naira-site:$version"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
trivy image --exit-code 1 --severity HIGH,CRITICAL "naira-workspace:$version"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
