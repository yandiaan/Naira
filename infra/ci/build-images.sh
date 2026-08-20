#!/usr/bin/env sh
set -eu

VERSION=$(printenv APP_VERSION 2>/dev/null || true)
if [ -z "$VERSION" ]; then VERSION=0.1.0-dev; fi
SHA=$(printenv GIT_SHA 2>/dev/null || true)
if [ -z "$SHA" ]; then SHA=$(git rev-parse --short HEAD); fi
BUILD_TIME=$(printenv BUILD_TIME 2>/dev/null || true)
if [ -z "$BUILD_TIME" ]; then BUILD_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ); fi

docker build --build-arg APP_VERSION=$VERSION --build-arg GIT_SHA=$SHA --build-arg BUILD_TIME=$BUILD_TIME -f infra/docker/api.Dockerfile -t naira-api:$VERSION .
docker build -f infra/docker/site.Dockerfile -t naira-site:$VERSION .
docker build -f infra/docker/workspace.Dockerfile -t naira-workspace:$VERSION .
