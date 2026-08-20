#!/usr/bin/env sh
set -eu

command -v trivy >/dev/null 2>&1 || {
  echo "Trivy is required for SBOM generation." >&2
  exit 1
}
VERSION=$(printenv APP_VERSION 2>/dev/null || true)
if [ -z "$VERSION" ]; then VERSION=0.1.0-dev; fi

mkdir -p ci-artifacts
trivy image --format cyclonedx --output ci-artifacts/naira-api.sbom.json naira-api:$VERSION
trivy image --format cyclonedx --output ci-artifacts/naira-site.sbom.json naira-site:$VERSION
trivy image --format cyclonedx --output ci-artifacts/naira-workspace.sbom.json naira-workspace:$VERSION
