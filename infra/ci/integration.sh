#!/usr/bin/env sh
set -eu

cleanup() {
  docker compose -f docker-compose.ci.yml logs --no-color || true
  docker compose -f docker-compose.ci.yml down -v
}
trap cleanup EXIT

docker compose -f docker-compose.ci.yml up -d --build
docker compose -f docker-compose.ci.yml ps
pnpm exec playwright test
(
  cd services/api
  go test -tags=integration ./...
)
