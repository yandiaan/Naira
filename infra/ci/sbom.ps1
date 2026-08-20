$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
if (-not (Get-Command trivy -ErrorAction SilentlyContinue)) {
  throw 'Trivy is required for SBOM generation.'
}
$version = if ($env:APP_VERSION) { $env:APP_VERSION } else { '0.1.0-dev' }

New-Item -ItemType Directory -Force 'ci-artifacts' | Out-Null
trivy image --format cyclonedx --output ci-artifacts/naira-api.sbom.json "naira-api:$version"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
trivy image --format cyclonedx --output ci-artifacts/naira-site.sbom.json "naira-site:$version"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
trivy image --format cyclonedx --output ci-artifacts/naira-workspace.sbom.json "naira-workspace:$version"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
