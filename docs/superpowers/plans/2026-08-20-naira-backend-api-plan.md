# Naira Backend and API Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build a testable Go modular-monolith foundation with health/version endpoints, OpenAPI contract, typed platform adapters, structured errors, authentication/authorization boundaries, and migration-ready PostgreSQL access.

**Architecture:** HTTP transport stays thin and maps requests to application services. Platform adapters expose PostgreSQL, Redis, object storage, configuration, logging, and build metadata through explicit ports. The foundation creates no complete business-flow module.

**Tech Stack:** Go, net/http, pgx, sqlc, PostgreSQL, Redis, SQL migrations, OpenAPI, TypeScript client generation, structured logging, and Go testing.

**Spec:** docs/superpowers/specs/2026-08-20-naira-foundation-design.md

## Global Constraints

- TypeScript.
- Astro.
- Svelte.
- PostgreSQL.
- Go.
- Flutter for the later mobile client.
- Redis.
- Public web and discovery experience.
- Authenticated planner workspace.
- Administrative web experience.
- Collaborative trips with an owner and members.
- Future mobile use without connectivity.
- Offline editing for itinerary, gear checklist, and logistics, followed by synchronization.
- Simple, auditable conflict handling in the first synchronization design.
- Code must be modular without overengineering, with readability as a primary review criterion.
- Commitlint must use the approved type, sentence-case subject, ui/api/empty scope, and no Co-authored-by trailer.
- Components and functions must avoid unnecessarily long lines; formatter print width is 100 where supported.
- The root AGENTS.md must reference .agents/architecture.md, .agents/conventions.md, .agents/structure.md, and .agents/testing.md.
- Dockerfiles must be multi-stage, non-root, reproducible, and free of baked-in secrets.
- Docker Compose must support local development and CI integration dependencies.
- Semantic versioning applies independently to contracts, shared packages, services, and applications.

---

### Task 1: Bootstrap the Go module and build metadata

**Files:**
- Create: services/api/go.mod
- Create: services/api/cmd/api/main.go
- Create: services/api/cmd/worker/main.go
- Create: services/api/internal/platform/buildinfo/buildinfo.go
- Create: services/api/internal/platform/config/config.go
- Create: services/api/internal/platform/config/config_test.go
- Modify: Taskfile.yml

**Interfaces:**
- BuildInfo contains Service, Version, GitSHA, and BuildTime strings.
- Load reads environment variables and returns a typed Config or a field-specific error.
- API and worker commands use the same internal packages but have separate process entrypoints.

- [ ] **Step 1: Initialize the Go module**

Run from services/api:

~~~powershell
go mod init naira/services/api
~~~

Use naira/services/api consistently in every generated import and internal package reference.

- [ ] **Step 2: Define build metadata**

Create buildinfo.go:

~~~go
package buildinfo

type BuildInfo struct {
    Service   string
    Version   string
    GitSHA    string
    BuildTime string
}

func Default() BuildInfo {
    return BuildInfo{
        Service:   "naira-api",
        Version:   "0.1.0-dev",
        GitSHA:    "unknown",
        BuildTime: "unknown",
    }
}
~~~

- [ ] **Step 3: Define typed configuration**

config.go must define server, database, Redis, CORS, and log settings. Load must reject an empty required APP_ENV and supply deterministic local defaults only when APP_ENV is local or test.

config_test.go must cover:

~~~go
func TestLoadRejectsMissingEnvironment(t *testing.T) {}
func TestLoadUsesLocalDefaults(t *testing.T) {}
func TestLoadDoesNotLogSecrets(t *testing.T) {}
~~~

- [ ] **Step 4: Create API and worker entrypoints**

cmd/api/main.go must load configuration, construct platform dependencies, start the HTTP server, and shut it down on SIGINT/SIGTERM. cmd/worker/main.go must load the same configuration and shut down cleanly on SIGINT/SIGTERM.

No endpoint or job is registered directly in command files; composition belongs in platform wiring.

- [ ] **Step 5: Add root Go commands**

Add to Taskfile.yml:

~~~yaml
  api:format:
    cmds:
      - gofmt -w services/api

  api:test:
    cmds:
      - go test ./services/api/...

  api:build:
    cmds:
      - go build ./services/api/cmd/api
      - go build ./services/api/cmd/worker
~~~

- [ ] **Step 6: Verify and commit**

~~~powershell
go test ./services/api/...
task api:build
git add services/api Taskfile.yml
git commit -m "feat(api): Bootstrap Go service"
~~~

### Task 2: Implement platform errors, logging, and health endpoints

**Files:**
- Create: services/api/internal/platform/errors/errors.go
- Create: services/api/internal/platform/logging/logger.go
- Create: services/api/internal/platform/health/checker.go
- Create: services/api/internal/transport/httpx/request_id.go
- Create: services/api/internal/transport/httpx/error_response.go
- Create: services/api/internal/transport/httpx/router.go
- Create: services/api/internal/transport/httpx/router_test.go
- Modify: services/api/cmd/api/main.go

**Interfaces:**
- AppError contains Code, Message, Details, Status, and Cause.
- HealthChecker exposes Check(context.Context) error.
- Router exposes live, ready, and version endpoints.
- Every error response contains error.code, error.message, error.details, and requestId.

- [ ] **Step 1: Write error mapping tests**

router_test.go must verify stable mappings for validation 422, unauthorized 401, forbidden 403, conflict 409, and unexpected errors that hide causes.

- [ ] **Step 2: Implement AppError and response mapping**

Define stable error codes for validation, authentication, authorization, not found, conflict, rate limit, dependency unavailable, and internal failure. Map causes to logs only; never serialize stack traces, SQL text, tokens, or credentials.

- [ ] **Step 3: Implement request IDs and structured logging**

Request middleware accepts X-Request-ID only after validating its length and characters; otherwise it generates a UUID. Add the request ID to response headers and structured logs. Log method, path, status, duration, and request ID.

- [ ] **Step 4: Implement health and version handlers**

Required endpoints:

~~~text
GET /health/live
GET /health/ready
GET /version
~~~

Live returns 200 while the process runs. Ready calls registered dependency checks and returns 503 with a stable dependency-unavailable error when any required dependency fails. Version returns BuildInfo as JSON.

- [ ] **Step 5: Wire the router**

Use a small HTTP router and keep handler functions below the transport layer. Register request ID, panic recovery, structured logging, CORS, and route handlers in that order. Authentication is added in Task 5 and is not enabled for health endpoints.

- [ ] **Step 6: Run tests and commit**

~~~powershell
go test ./services/api/internal/platform/...
go test ./services/api/internal/transport/...
git add services/api/internal/platform services/api/internal/transport services/api/cmd/api/main.go
git commit -m "feat(api): Add health and error boundaries"
~~~

### Task 3: Publish the OpenAPI contract and TypeScript client package

**Files:**
- Create: packages/api-contracts/package.json
- Create: packages/api-contracts/openapi/openapi.yaml
- Create: packages/api-contracts/src/index.ts
- Create: packages/api-contracts/scripts/generate.mjs
- Create: packages/api-contracts/test/contract.test.ts
- Create: clients/mobile/README.md
- Modify: Taskfile.yml

**Interfaces:**
- OpenAPI defines /api/v1/health/live, /api/v1/health/ready, and /api/v1/version.
- TypeScript consumers import generated types from @naira/api-contracts.
- The future Flutter client consumes the same OpenAPI document; no Dart application is created by this task.

- [ ] **Step 1: Write the contract first**

Create openapi.yaml with JSON schemas for BuildInfo, ErrorEnvelope, HealthResponse, and ReadyResponse. Define requestId headers, bearerAuth security scheme, and the three versioned paths.

~~~yaml
paths:
  /api/v1/health/live:
    get:
      operationId: getLiveHealth
  /api/v1/health/ready:
    get:
      operationId: getReadyHealth
  /api/v1/version:
    get:
      operationId: getVersion
~~~

- [ ] **Step 2: Add contract validation and generation tools**

Install pinned dev dependencies @redocly/cli, openapi-typescript, and openapi-fetch. Use redocly lint for document validation and openapi-typescript plus openapi-fetch for deterministic TypeScript types and fetch helpers. Make contract.test.ts fail for invalid references, duplicate operation IDs, missing response schemas, or an undocumented error envelope.

- [ ] **Step 3: Generate TypeScript types and fetch helpers**

scripts/generate.mjs reads openapi.yaml, generates TypeScript types, and writes deterministic output under packages/api-contracts/generated. The generated file is regenerated by a package script and is not hand-edited.

- [ ] **Step 4: Add the future mobile handoff**

clients/mobile/README.md documents that Flutter uses the committed OpenAPI document and secure token storage. It must not claim that mobile source exists.

- [ ] **Step 5: Add contract tasks**

Add to Taskfile.yml:

~~~yaml
  api:contract:check:
    cmds:
      - pnpm --dir packages/api-contracts test

  api:contract:generate:
    cmds:
      - pnpm --dir packages/api-contracts generate
~~~

- [ ] **Step 6: Verify and commit**

~~~powershell
corepack pnpm --filter @naira/api-contracts generate
corepack pnpm --filter @naira/api-contracts test
git add packages/api-contracts clients/mobile Taskfile.yml
git commit -m "feat(api): Publish OpenAPI foundation contract"
~~~
+

### Task 4: Add PostgreSQL, Redis, and storage ports

**Files:**
- Create: services/api/internal/platform/postgres/pool.go
- Create: services/api/internal/platform/redis/client.go
- Create: services/api/internal/platform/storage/object_store.go
- Create: services/api/internal/platform/postgres/health.go
- Create: services/api/internal/platform/redis/health.go
- Create: services/api/internal/platform/storage/health.go
- Create: services/api/sqlc.yaml
- Create: services/api/queries/health.sql
- Create when SQLC CLI is available: services/api/internal/platform/postgres/generated/health.sql.go
- Create: services/api/internal/platform/platform_test.go
- Modify: services/api/cmd/api/main.go

**Interfaces:**
- PostgreSQL exposes pool construction, ping, and transaction boundaries.
- Redis exposes client construction, ping, namespaced key helpers, and TTL-aware operations.
- ObjectStore exposes Put, Delete, and PresignPut ports.
- Health checks implement HealthChecker from Task 2.

- [ ] **Step 1: Write adapter interface tests**

platform_test.go verifies configuration is passed to adapters without writing secrets to logs and that health checks return dependency-specific errors.

- [ ] **Step 2: Add exact Go dependencies**

Keep PostgreSQL and Redis runtime dependencies pinned. The foundation migration runner is PostgreSQL-only and uses pgx plus a small schema_migrations table; it does not add a general-purpose migration library with unrelated database drivers.

- [ ] **Step 3: Configure sqlc**

Create sqlc.yaml for PostgreSQL and output under internal/platform/postgres/generated. Create queries/health.sql:

~~~sql
-- name: HealthCheck :one
SELECT 1::integer AS ok;
~~~

Keep sqlc.yaml and queries/health.sql as the typed-SQL boundary. The foundation health path uses pgxpool.Ping; generating health.sql.go requires the external SQLC CLI toolchain and is not required for the current runtime behavior.

- [ ] **Step 4: Implement PostgreSQL and Redis adapters**

PostgreSQL uses a bounded connection pool, context-aware ping, and explicit transaction helper. Redis uses namespaced keys and requires TTL for cache and idempotency helpers. No adapter exposes raw clients outside its platform package.

- [ ] **Step 5: Implement the object-storage port**

Define object_store.go:

~~~go
type ObjectStore interface {
    Put(ctx context.Context, key string, content io.Reader, contentType string) error
    Delete(ctx context.Context, key string) error
    PresignPut(ctx context.Context, key string, contentType string, expiry time.Duration) (string, error)
}
~~~

Provide a local-disabled adapter that returns a typed dependency-unavailable error until the infrastructure plan supplies S3-compatible storage. Do not write file bytes to PostgreSQL.

- [ ] **Step 6: Register readiness checks**

Wire PostgreSQL, Redis, and object storage checks into /health/ready. /health/live remains independent of external dependencies.

- [ ] **Step 7: Verify and commit**

~~~powershell
go test ./services/api/internal/platform/...
go generate ./services/api/...
git add services/api
git commit -m "feat(api): Add platform dependency adapters"
~~~

### Task 5: Add migration and authentication boundaries

**Files:**
- Create: services/api/migrations/00001_platform.sql
- Create: services/api/internal/platform/migrations/runner.go
- Create: services/api/internal/platform/auth/principal.go
- Create: services/api/internal/platform/auth/authenticator.go
- Create: services/api/internal/platform/auth/authorization.go
- Create: services/api/internal/platform/auth/auth_test.go
- Modify: services/api/cmd/api/main.go

**Interfaces:**
- Principal contains Subject, PlatformRoles, and claims.
- Authenticator exposes Authenticate(context.Context, string) (Principal, error).
- Authorizer exposes Authorize(context.Context, Principal, Action, Resource) error.
- No production identity provider is selected or embedded.

- [ ] **Step 1: Define the migration baseline**

Create 00001_platform.sql with only platform-safe structures needed by the foundation, including an audit event table if the implementation uses it. The runner reads sorted SQL files, executes the section between goose Up and goose Down markers in a transaction, and records applied versions in schema_migrations. Do not create complete trip, gear, itinerary, or logistics tables.

The migration runner applies forward-only SQL migrations and reports the applied version through structured logs.

- [ ] **Step 2: Write authentication tests**

auth_test.go covers:

~~~go
func TestMissingBearerTokenIsUnauthorized(t *testing.T) {}
func TestMalformedBearerTokenIsUnauthorized(t *testing.T) {}
func TestUserCannotSatisfyAdminRole(t *testing.T) {}
func TestAdminRoleDoesNotGrantTripMembership(t *testing.T) {}
func TestUnknownProviderReturnsNotConfigured(t *testing.T) {}
~~~

- [ ] **Step 3: Implement provider-neutral interfaces**

Define Principal, Authenticator, Action, Resource, and Authorizer. Implement a deterministic not-configured authenticator for the foundation. Do not add password hashing, OAuth callbacks, or provider-specific JWT parsing.

- [ ] **Step 4: Implement policy helpers**

Provide RequirePlatformRole and a resource-policy seam that returns authorization errors. The resource-policy seam accepts a resource identifier and membership lookup port without creating a trip module.

- [ ] **Step 5: Wire middleware only where required**

Health endpoints remain public. Version may be public. Future business routes use authentication and authorization through explicit route groups.

- [ ] **Step 6: Verify and commit**

~~~powershell
go test ./services/api/internal/platform/auth ./services/api/internal/platform/migrations
git add services/api/migrations services/api/internal/platform/auth services/api/internal/platform/migrations services/api/cmd/api/main.go
git commit -m "feat(api): Add auth and migration boundaries"
~~~

### Task 6: Add offline synchronization contract primitives

**Files:**
- Create: services/api/internal/platform/sync/types.go
- Create: services/api/internal/platform/sync/validation.go
- Create: services/api/internal/platform/sync/sync_test.go
- Modify: packages/api-contracts/openapi/openapi.yaml
- Modify: Taskfile.yml

**Interfaces:**
- MutationEnvelope contains MutationID, EntityID, ExpectedVersion, Operation, and Payload.
- ChangeCursor is opaque and cannot be parsed by clients.
- ApplyResult has applied, conflict, and rejected statuses.
- Conflict contains the server version and a safe conflict code without exposing database internals.

- [ ] **Step 1: Define synchronization types**

Create types.go:

~~~go
type MutationOperation string

const (
    MutationCreate MutationOperation = "create"
    MutationUpdate MutationOperation = "update"
    MutationDelete MutationOperation = "delete"
)

type MutationEnvelope struct {
    MutationID      string
    EntityID        string
    ExpectedVersion int64
    Operation       MutationOperation
    Payload         json.RawMessage
}

type ApplyStatus string

const (
    ApplyStatusApplied   ApplyStatus = "applied"
    ApplyStatusConflict  ApplyStatus = "conflict"
    ApplyStatusRejected  ApplyStatus = "rejected"
)
~~~

Use JSON tags in the actual implementation and keep IDs opaque strings at the transport boundary.

- [ ] **Step 2: Validate mutation envelopes**

validation.go must reject an empty mutation ID, empty entity ID, negative expected version, unknown operation, and invalid JSON payload. It must return stable validation error codes.

- [ ] **Step 3: Write sync tests**

sync_test.go must cover valid create/update/delete envelopes, duplicate mutation IDs, stale version conflict mapping, tombstone representation, and invalid input.

- [ ] **Step 4: Add OpenAPI schemas**

Add MutationRequest, MutationResult, Conflict, ChangeCursor, ChangeRecord, and ChangePage schemas to the contract components. Do not add a handler or full sync endpoint in this foundation task; the schemas are the stable extension point for the future sync module.

- [ ] **Step 5: Add contract verification**

Add a contract test that verifies every sync schema has required fields and that Conflict maps to HTTP 409 semantics.

- [ ] **Step 6: Verify and commit**

~~~powershell
go test ./services/api/internal/platform/sync
task api:contract:generate
task api:contract:check
git add services/api/internal/platform/sync packages/api-contracts/openapi/openapi.yaml Taskfile.yml
git commit -m "feat(api): Define offline sync contract"
~~~

### Task 7: Add worker and operational process boundaries

**Files:**
- Create: services/api/internal/platform/jobs/job.go
- Create: services/api/internal/platform/jobs/queue.go
- Create: services/api/internal/platform/jobs/worker.go
- Create: services/api/internal/platform/jobs/worker_test.go
- Modify: services/api/cmd/worker/main.go
- Modify: Taskfile.yml

**Interfaces:**
- Job contains ID, Name, Payload, Attempts, and CreatedAt.
- Queue exposes Enqueue and Receive.
- Worker supervisor exposes Start and Shutdown.
- Jobs are idempotent by job ID and contain no business-specific handlers in the foundation.

- [ ] **Step 1: Write worker lifecycle tests**

worker_test.go verifies clean startup, context cancellation, retry-limit enforcement, and shutdown without leaked goroutines.

- [ ] **Step 2: Implement the Redis-backed queue boundary**

Implement queue namespacing and retry metadata behind Queue. Keep concrete Redis operations inside the platform adapter. Do not expose Redis commands to future domain modules.

- [ ] **Step 3: Wire the worker command**

cmd/worker/main.go starts the worker supervisor, emits structured startup and shutdown logs, and exits non-zero only on configuration or dependency failure.

- [ ] **Step 4: Add task commands**

Add to Taskfile.yml:

~~~yaml
  api:worker:test:
    cmds:
      - go test ./services/api/internal/platform/jobs

  api:run:
    cmds:
      - go run ./services/api/cmd/api

  api:worker:
    cmds:
      - go run ./services/api/cmd/worker
~~~

- [ ] **Step 5: Verify and commit**

~~~powershell
task api:worker:test
go test ./services/api/...
git add services/api/internal/platform/jobs services/api/cmd/worker Taskfile.yml
git commit -m "feat(api): Add worker process boundary"
~~~

### Task 8: Verify the backend/API subsystem

**Files:**
- Test: services/api
- Test: packages/api-contracts
- Test: clients/mobile/README.md

**Interfaces:**
- Consumes Tasks 1-7.
- Produces the backend artifact consumed by web clients and infrastructure.

- [ ] **Step 1: Run Go formatting and tests**

~~~powershell
gofmt -w services/api
go test ./services/api/...
go vet ./services/api/...
~~~

- [ ] **Step 2: Run contract checks**

~~~powershell
task api:contract:generate
task api:contract:check
~~~

Expected: generated types are deterministic and the OpenAPI document validates.

- [ ] **Step 3: Build both processes**

~~~powershell
go build ./services/api/cmd/api
go build ./services/api/cmd/worker
~~~

- [ ] **Step 4: Run integration-tag checks when Compose is available**

~~~powershell
go test -tags=integration ./services/api/...
~~~

The command uses real PostgreSQL, Redis, and object storage after the infrastructure plan is installed. Before those services exist, it must fail with a clear dependency-start message rather than silently skipping.

- [ ] **Step 5: Check repository quality**

~~~powershell
task format
git diff --check
~~~

The subsystem is complete when API, worker, OpenAPI, adapter, migration, auth-boundary, and contract checks pass.
