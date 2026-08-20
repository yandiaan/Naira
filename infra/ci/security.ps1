$ErrorActionPreference = 'Stop'
if (-not (Get-Command trivy -ErrorAction SilentlyContinue)) {
  throw 'Trivy is required for security checks.'
}

trivy fs --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed .
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-api:0.1.0-dev
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-site:0.1.0-dev
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-workspace:0.1.0-dev
