#!/usr/bin/env sh
set -eu

command -v trivy >/dev/null 2>&1 || {
  echo "Trivy is required for security checks." >&2
  exit 1
}
VERSION=$(printenv APP_VERSION 2>/dev/null || true)
if [ -z "$VERSION" ]; then VERSION=0.1.0-dev; fi

trivy fs --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed .
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-api:$VERSION
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-site:$VERSION
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-workspace:$VERSION
