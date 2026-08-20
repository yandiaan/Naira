$ErrorActionPreference = 'Stop'
if (-not (Get-Command trivy -ErrorAction SilentlyContinue)) {
  throw 'Trivy is required for SBOM generation.'
}

New-Item -ItemType Directory -Force 'ci-artifacts' | Out-Null
trivy image --format cyclonedx --output ci-artifacts/naira-api.sbom.json naira-api:0.1.0-dev
trivy image --format cyclonedx --output ci-artifacts/naira-site.sbom.json naira-site:0.1.0-dev
trivy image --format cyclonedx --output ci-artifacts/naira-workspace.sbom.json naira-workspace:0.1.0-dev
