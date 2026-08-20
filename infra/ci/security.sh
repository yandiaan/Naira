#!/usr/bin/env sh
set -eu

command -v trivy >/dev/null 2>&1 || {
  echo "Trivy is required for security checks." >&2
  exit 1
}

trivy fs --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed .
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-api:0.1.0-dev
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-site:0.1.0-dev
trivy image --exit-code 1 --severity HIGH,CRITICAL naira-workspace:0.1.0-dev
