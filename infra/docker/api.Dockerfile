FROM golang:1.26-alpine AS builder

WORKDIR /src
COPY services/api/go.mod services/api/go.sum ./services/api/
RUN cd services/api && go mod download
COPY services/api ./services/api

ARG APP_VERSION=0.1.0-dev
ARG GIT_SHA=unknown
ARG BUILD_TIME=unknown

RUN cd services/api && \
    CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags "-s -w -X naira/services/api/internal/platform/buildinfo.Version:$APP_VERSION -X naira/services/api/internal/platform/buildinfo.GitSHA:$GIT_SHA -X naira/services/api/internal/platform/buildinfo.BuildTime:$BUILD_TIME" -o /out/naira-api ./cmd/api && \
    CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags "-s -w -X naira/services/api/internal/platform/buildinfo.Version:$APP_VERSION -X naira/services/api/internal/platform/buildinfo.GitSHA:$GIT_SHA -X naira/services/api/internal/platform/buildinfo.BuildTime:$BUILD_TIME" -o /out/naira-worker ./cmd/worker && \
    CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags "-s -w -X naira/services/api/internal/platform/buildinfo.Version:$APP_VERSION -X naira/services/api/internal/platform/buildinfo.GitSHA:$GIT_SHA -X naira/services/api/internal/platform/buildinfo.BuildTime:$BUILD_TIME" -o /out/naira-migrate ./cmd/migrate && \
    cp -R migrations /out/migrations

FROM alpine:3.22

RUN apk add --no-cache wget && addgroup -S naira && adduser -S -G naira naira
WORKDIR /app
COPY --from=builder /out/naira-api /usr/local/bin/naira-api
COPY --from=builder /out/naira-worker /usr/local/bin/naira-worker
COPY --from=builder /out/naira-migrate /usr/local/bin/naira-migrate
COPY --from=builder /out/migrations /app/migrations

USER naira
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/naira-api"]
