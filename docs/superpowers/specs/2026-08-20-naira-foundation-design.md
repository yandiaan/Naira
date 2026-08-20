# Naira Foundation Architecture Design

- Date: 2026-08-20
- Status: Proposed for written review
- Scope: Technical foundation and scaffolding
- Product: Naira, an outdoor trip and hiking planning platform

## 1. Context

Naira will help hikers and outdoor ecosystem participants plan trips, including gear, logistics, itinerary, and related travel needs. The first client is a responsive, mobile-first web experience. A mobile application will follow, and an administrative web experience is required from the beginning.

The initial work is intentionally foundation-only. It must establish technical boundaries, engineering standards, design-system foundations, runtime infrastructure, and quality gates without prematurely implementing the business flow.

The confirmed technology constraints are:

- TypeScript;
- Astro;
- Svelte;
- PostgreSQL;
- Go;
- Flutter for the later mobile client;
- Redis.

The initial product constraints are:

- public web and discovery experience;
- authenticated planner workspace;
- administrative web experience;
- collaborative trips with an owner and members;
- future mobile use without connectivity;
- offline editing for itinerary, gear checklist, and logistics, followed by synchronization;
- simple, auditable conflict handling in the first synchronization design.

## 2. Goals

This design establishes:

1. clear repository and deployable boundaries;
2. modular but readable code organization;
3. a reusable token-first design system;
4. a Go modular monolith with a stable API contract;
5. PostgreSQL, Redis, and object-storage responsibilities;
6. offline-synchronization extension points;
7. commit, testing, CI/CD, Docker, and release standards;
8. agent guidance documents that remain modular and maintainable;
9. semantic-versioning rules for contracts, packages, services, and applications.

## 3. Non-goals

The foundation does not implement:

- complete trip, gear, logistics, or itinerary business flows;
- marketplace or partner-management behavior;
- full mobile application behavior;
- complete offline synchronization worker and local mobile database;
- final map provider or route-planning algorithm;
- production cloud-provider selection;
- final visual brand palette or polished product UI;
- microservices;
- a custom password and identity system.

These are deferred by design so that the foundation does not encode unsupported product assumptions.

## 4. Macro architecture

```text
Public users --------------> Astro site
                             Svelte islands for local interaction

Authenticated users/admin --> SvelteKit application workspace
                             /app and /admin route boundaries

Mobile later --------------> The same versioned API

Astro / SvelteKit / Flutter
             │ HTTPS + OpenAPI
             ▼
      Go modular monolith
          ┌──────┴──────┐
          ▼             ▼
      PostgreSQL       Redis
      source of truth  cache/queue/lock
          │
          ▼
      S3-compatible object storage
```

Astro is used for the public and discovery surface, where server-rendered content and selective hydration are valuable. SvelteKit is used for the application workspace, where routing, application state, authentication boundaries, offline preparation, and interactive workflows are primary concerns.

The workspace starts as one SvelteKit deployable with separate `(app)` and `(admin)` route groups. The admin surface can be extracted into a separate deployable later without changing the Go API contract.

The backend starts as one Go modular monolith. Module boundaries are explicit, but there is no premature service-to-service network boundary.

## 5. Repository boundary

```text
apps/
  site/                         # Astro + Svelte islands
  workspace/                    # SvelteKit: planner + admin

services/
  api/                          # Go modular monolith
    cmd/
      api/
      worker/
    internal/
      platform/
      modules/
        identity/
        access/
        trips/
        itinerary/
        gear/
        logistics/
        route/
        files/
        notification/
        audit/
        admin/
    migrations/

packages/
  api-contracts/
  design-tokens/
  ui-svelte/
  eslint-config/
  tsconfig/

clients/
  mobile/                       # Flutter, later phase

infra/
  docker/
  local/
  ci/

docs/
  architecture/
  decisions/
  superpowers/

AGENTS.md
.agents/
  architecture.md
  conventions.md
  structure.md
  testing.md
```

The repository is a pnpm workspace for TypeScript applications and packages. Go and Flutter keep their native module/package conventions and are orchestrated from the repository root through a cross-platform `Taskfile.yml`.

## 6. Engineering standards

### 6.1 Commitlint

The repository uses `commitlint.config.ts` with the following configuration:

```ts
import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', [
      'chore',
      'docs',
      'style',
      'feat',
      'fix',
      'refactor',
      'test'
    ]],
    'subject-case': [RuleConfigSeverity.Error, 'always', ['sentence-case']],
    'scope-enum': [RuleConfigSeverity.Error, 'always', ['ui', 'api', '']],
    'trailer-exists': [RuleConfigSeverity.Error, 'never', 'Co-authored-by']
  }
};

export default Configuration;
```

The scope policy intentionally permits only `ui`, `api`, or no scope. Infrastructure, documentation, configuration, and release commits use an empty scope. Commit messages are checked locally by a `commit-msg` hook and again in CI.

### 6.2 Modularity and readability

- Organize by feature and ownership boundary.
- Keep handlers, components, and functions focused on one responsibility.
- Introduce abstractions only for an external boundary, multiple consumers, or a real testing seam.
- Do not create generic utility or repository dumping grounds.
- Keep business rules out of page components and Svelte templates.
- Use TypeScript strict mode and avoid `any`.
- Use `gofmt`, `go vet`, and static analysis for Go.
- Use a formatter print width of 100 for TypeScript, Svelte, Astro, Markdown, YAML, and SQL where supported.
- Unavoidable long literals may use explicit local exceptions.
- Do not enforce an arbitrary maximum number of lines per function; readability, complexity, and responsibility are reviewed together.

### 6.3 Agent guidance

`AGENTS.md` is the root entry point and imports or references the following normative documents:

- `.agents/architecture.md`: architecture and dependency rules;
- `.agents/conventions.md`: naming, errors, commits, and readability;
- `.agents/structure.md`: repository layout and module placement;
- `.agents/testing.md`: test strategy and required commands.

The spelling `conventions.md` is intentional and corrects the earlier shorthand `convetions.md`.

## 7. Design system and UI architecture

The design system is token-first, mobile-first, accessibility-first, and state-complete.

```text
design tokens
      ▼
Svelte primitives
      ▼
shared patterns
      ▼
feature components
      ▼
page/application
```

### 7.1 Design tokens

`packages/design-tokens` owns:

- primitive colors, typography, spacing, radius, elevation, and motion;
- semantic surface, content, border, action, feedback, and focus tokens;
- component-level tokens for controls and navigation.

Tokens generate CSS custom properties for Astro and SvelteKit, JSON for tooling, and Dart constants for Flutter later. Components cannot define raw colors, spacing, radius, or shadows directly.

### 7.2 Svelte primitives and patterns

`packages/ui-svelte` contains reusable accessible primitives such as Button, Input, Select, Dialog, Drawer, Tabs, Toast, Card, Badge, Table, Pagination, Skeleton, EmptyState, ErrorState, OfflineBanner, and SyncStatus.

Primitives support explicit default, hover, focus, disabled, loading, error, empty, and offline states. Business-specific components remain inside application features until they are proven reusable.

Shared patterns include `AppShell`, `PageHeader`, `Section`, `Stack`, `Grid`, `FormSection`, `FilterBar`, `ListRow`, `Timeline`, `Checklist`, and `ResponsiveTable`.

### 7.3 Responsive and accessibility rules

- Mobile is the default layout.
- Touch targets are at least 44px.
- Desktop sidebars become mobile drawers or bottom navigation.
- Admin tables have a mobile representation.
- Semantic HTML, keyboard navigation, visible focus, screen-reader labels, reduced-motion support, and accessible form errors are mandatory.
- The target accessibility standard is WCAG 2.2 AA.

The public site, workspace, and admin share tokens and primitives but may use different composition and density. Flutter later implements native components with the same semantic tokens and interaction rules rather than sharing Svelte source code.

## 8. Backend system design

```text
HTTP transport
  middleware + thin handlers
          ▼
Application layer
  use cases + transaction boundary
          ▼
Domain layer
  entities + policies + invariants
          ▼
Ports
          ▼
Adapters
  PostgreSQL / Redis / object storage / providers
```

Handlers parse, validate, invoke an application service, and map the result. They do not contain business logic.

Backend modules include `identity`, `access`, `trips`, `itinerary`, `gear`, `logistics`, `route`, `files`, `notification`, `audit`, and `admin`. Each module owns its domain, application services, ports, adapters, transport, and queries.

Module rules:

- domain code does not know HTTP, PostgreSQL, Redis, or external frameworks;
- application services coordinate use cases and transactions;
- adapters implement ports;
- modules do not read another module's tables directly;
- cross-module access uses an application port or explicit service interface;
- generic repositories are avoided.

PostgreSQL access uses explicit SQL with `pgx` and `sqlc`. Migrations are forward-only SQL migrations, and production rollback uses a compensating migration or expand/contract strategy.

Redis is limited to cache, rate limiting, locks, temporary session state, idempotency records, job coordination, and background queues. It is never the source of business truth.

The worker uses the same Go codebase and domain modules as the API, but runs through `cmd/worker`. It is not a separate microservice.

## 9. API, auth, and authorization

The API is REST JSON with versioning under `/api/v1`. OpenAPI is the source contract for TypeScript and Dart clients. Clients do not import Go implementation models.

The standard error envelope is:

```json
{
  "error": {
    "code": "TRIP_ACCESS_DENIED",
    "message": "You do not have access to this trip.",
    "details": {},
    "requestId": "..."
  }
}
```

The API supports structured validation, request IDs, correlation IDs, pagination, idempotency keys, optimistic concurrency, and `409 Conflict` for stale updates.

Authentication uses an OIDC/OAuth2-compatible identity-provider boundary. The provider is selected in a separate authentication ADR. The API remains the authority for authorization. Web sessions do not place long-lived tokens in `localStorage`; mobile uses Authorization Code + PKCE with secure OS storage.

Authorization has two independent dimensions:

- platform roles: user, admin, operator;
- resource roles: trip owner, editor, viewer.

Platform admin is not equivalent to trip ownership. Backend policy checks are required even when the frontend hides a route or control.

## 10. Data and offline synchronization foundation

Mutable synchronized entities may have:

```text
id
created_at
updated_at
created_by
updated_by
version
deleted_at
```

IDs are opaque and may be generated at the application or client boundary. A version increments on every update. Updates include the expected version; stale updates fail with `409 Conflict`.

Deletes use tombstones before purge so clients can observe deletions during synchronization. File metadata is stored in PostgreSQL; file content is stored in S3-compatible object storage.

The future sync contract is:

```text
mutation:
  mutation_id
  entity_id
  expected_version
  operation
  payload

change pull:
  cursor
  changes
  tombstones
  next_cursor
  has_more
```

The default conflict behavior rejects stale updates rather than silently applying last-write-wins. Append-only entities may merge by ID. Aggregate-specific conflict policies are introduced only when real domain behavior requires them.

The foundation prepares the contract, metadata, and idempotency rules; it does not implement the mobile database or full synchronization engine.

## 11. Infrastructure and Docker

Each deployable has its own multi-stage Dockerfile:

```text
infra/docker/
  api.Dockerfile
  site.Dockerfile
  workspace.Dockerfile
```

Images use pinned base images, minimal runtime layers, non-root users, health checks, reproducible builds, and no baked-in secrets.

Local and CI Compose files provide:

- PostgreSQL;
- Redis;
- S3-compatible object storage;
- API;
- worker;
- site;
- workspace;
- migration and test runners.

Production may use a platform-native deployment mechanism instead of Compose. The deployable boundary remains the same.

The runtime separates local, CI, preview, staging, and production configuration. Secrets are injected by the environment; `.env.example` documents required variable names without containing secrets.

The service exposes `/health/live`, `/health/ready`, and `/version`. Logs are structured JSON and must not contain credentials, tokens, or unredacted sensitive data.

## 12. Testing and quality gates

The test pyramid is:

```text
E2E / smoke
contract / API tests
integration with real dependencies
unit and component tests
```

TypeScript uses Vitest for unit and component tests, `svelte-check`, `astro check`, and Playwright for browser E2E. Go uses `go test`, integration tests against real PostgreSQL/Redis/object storage, migration tests, and static analysis. Flutter later uses unit, widget, repository/service, and integration tests.

No SQLite substitute is used for PostgreSQL integration behavior.

Every pull request runs:

1. commitlint;
2. formatting and lint;
3. typecheck;
4. unit/component tests;
5. OpenAPI validation;
6. migration validation;
7. integration tests;
8. build verification;
9. dependency, secret, static-analysis, and container checks.

Coverage is treated as a quality signal. Critical behavior must have meaningful tests; arbitrary coverage inflation is not a goal.

The root `Taskfile.yml` exposes consistent commands:

```text
task dev
task check
task test
task test:integration
task build
task docker:build
task ci
task release
```

## 13. CI/CD and semantic versioning

The CI stages are:

```text
validate -> test -> integration -> build -> scan -> release -> deploy -> smoke
```

Pull requests run validation and integration checks. The main branch produces verified images and deploys to staging. SemVer tags produce release artifacts. Production deployment requires explicit approval and a post-deploy smoke test.

Images use immutable tags such as:

```text
v0.1.0
v0.1.0-<git-sha>
```

The repository does not deploy using `latest`.

SemVer applies independently to:

- `api-contracts`;
- `design-tokens`;
- `ui-svelte`;
- API service;
- site;
- workspace;
- mobile.

`feat` maps to a minor release, `fix` to a patch release, and breaking changes to a major release. API URL major versions such as `/api/v1` are managed separately from the binary or package version. Build metadata is exposed through `/version` and release artifacts.

## 14. Foundation acceptance criteria

The scaffolding phase is complete when:

- Astro site runs and builds;
- SvelteKit workspace contains separate app and admin shells;
- Go API exposes health, readiness, and version endpoints;
- PostgreSQL, Redis, and object storage run through Compose;
- migration and integration tests run successfully;
- OpenAPI contract validates;
- commitlint and the commit hook are active;
- `AGENTS.md` and all `.agents/*.md` guides exist and are referenced;
- each deployable Dockerfile builds successfully;
- CI Compose runs dependency-backed tests;
- SemVer metadata and release checks exist;
- design tokens and Svelte primitive foundations are available;
- no complete business flow is required for foundation acceptance.

## 15. Deferred decisions with explicit triggers

The following decisions are intentionally deferred:

- identity provider: decide before implementing production authentication;
- cloud provider: decide before staging deployment;
- map and route provider: decide when route data and external map behavior enter scope;
- PostGIS: add when spatial queries or route geometry become first-class requirements;
- detailed sync conflict policy: decide per aggregate when collaborative offline behavior is implemented;
- final brand palette: decide when visual product direction is ready;
- component workbench implementation tool: choose during UI foundation implementation, while isolated component documentation remains mandatory.

These deferrals do not block the foundation because the relevant ports, contracts, and boundaries are already defined.
