#!/usr/bin/env sh
set -eu

for URL in \
  http://127.0.0.1:8080/health/live \
  http://127.0.0.1:8080/health/ready \
  http://127.0.0.1:8080/version \
  http://127.0.0.1:4322/ \
  http://127.0.0.1:5174/app \
  http://127.0.0.1:5174/admin
do
  curl --fail --silent --show-error "$URL" >/dev/null
done
