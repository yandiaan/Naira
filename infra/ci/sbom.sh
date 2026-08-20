#!/usr/bin/env sh
set -eu

command -v trivy >/dev/null 2>&1 || {
  echo "Trivy is required for SBOM generation." >&2
  exit 1
}

mkdir -p ci-artifacts
trivy image --format cyclonedx --output ci-artifacts/naira-api.sbom.json naira-api:0.1.0-dev
trivy image --format cyclonedx --output ci-artifacts/naira-site.sbom.json naira-site:0.1.0-dev
trivy image --format cyclonedx --output ci-artifacts/naira-workspace.sbom.json naira-workspace:0.1.0-dev
