# Naira Infrastructure and Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add secure multi-stage Dockerfiles, local and CI Compose environments, provider-neutral CI commands, image/security validation, and semantic-versioned release metadata.

**Architecture:** Astro is built as a static public image, SvelteKit runs through a Node adapter, and Go API/worker binaries use a minimal non-root runtime. Compose provides PostgreSQL, Redis, S3-compatible storage, API, worker, site, and workspace for local and CI integration. CI providers invoke the repository Taskfile instead of duplicating business logic in provider-specific YAML.

**Tech Stack:** Docker, Docker Compose, PostgreSQL, Redis, S3-compatible object storage, Node.js, Astro, SvelteKit, Go, pnpm, Taskfile, SemVer validation, Trivy, and PowerShell/POSIX CI scripts.

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

### Task 1: Create multi-stage application Dockerfiles

**Files:**
- Create: infra/docker/api.Dockerfile
- Create: infra/docker/site.Dockerfile
- Create: infra/docker/workspace.Dockerfile
- Create: infra/docker/nginx.conf
- Create: infra/docker/.dockerignore

**Interfaces:**
- API image accepts APP_VERSION, GIT_SHA, and BUILD_TIME build arguments.
- API image can run api or worker through an explicit command.
- Site image serves the Astro static output.
- Workspace image runs the SvelteKit Node adapter as a non-root user.
- No image contains source secrets or development-only dependency caches.

- [ ] **Step 1: Resolve immutable base images**

Use patch-pinned Node, Go, nginx, Alpine, PostgreSQL, Redis, and MinIO tags supported by the installed toolchain. Do not use latest. Digest pinning remains a CI hardening follow-up because the local Docker daemon is unavailable during this foundation run.

- [ ] **Step 2: Build the Go API image**

api.Dockerfile must:

1. copy only Go module files before source for dependency caching;
2. run go mod download;
3. build API and worker binaries with version ldflags;
4. copy binaries into a minimal non-root runtime;
5. expose the API port;
6. set an explicit default command for the API.

The worker command is selected by Compose through an explicit command override.

- [ ] **Step 3: Build the Astro site image**

site.Dockerfile must:

1. install pnpm through Corepack using the root package-manager pin;
2. install with the lockfile;
3. build only apps/site and required workspace packages;
4. copy dist into the nginx runtime;
5. use nginx.conf for SPA-safe asset and health behavior without exposing source files.

- [ ] **Step 4: Build the SvelteKit workspace image**

workspace.Dockerfile must:

1. install dependencies with the lockfile;
2. build apps/workspace with the Node adapter;
3. copy only production runtime dependencies and build output;
4. run as a non-root user;
5. expose the workspace port;
6. use a health endpoint or deterministic HTML smoke check.

- [ ] **Step 5: Add Docker ignore rules**

infra/docker/.dockerignore must exclude node_modules, .git, .env files, coverage, test output, local volumes, and generated caches while retaining package manifests, source, migrations, and lockfiles.

- [ ] **Step 6: Build images and commit**

~~~powershell
docker build -f infra/docker/api.Dockerfile -t naira-api:test .
docker build -f infra/docker/site.Dockerfile -t naira-site:test .
docker build -f infra/docker/workspace.Dockerfile -t naira-workspace:test .
git add infra/docker
git commit -m "chore: Add application Docker images"
~~~

### Task 2: Create local and CI Compose environments

**Files:**
- Create: docker-compose.yml
- Create: docker-compose.ci.yml
- Create: .env.example
- Create: infra/local/init-postgres.sql
- Create: infra/ci/compose-smoke.ps1
- Create: infra/ci/compose-smoke.sh

**Interfaces:**
- Local Compose exposes API, worker, site, workspace, PostgreSQL, Redis, and S3-compatible storage.
- CI Compose uses ephemeral volumes and deterministic healthchecks.
- Credentials come from environment variables or CI secrets, never committed values.

- [ ] **Step 1: Define the local network and services**

docker-compose.yml must contain services named api, worker, site, workspace, postgres, redis, and object-storage. Only site, workspace, and API ports are published for local development. PostgreSQL, Redis, and object storage remain reachable through the internal Compose network.

- [ ] **Step 2: Add healthchecks**

Healthchecks must use:

~~~yaml
healthcheck:
  interval: 5s
  timeout: 3s
  retries: 20
  start_period: 5s
~~~

Use service-specific commands for PostgreSQL, Redis, object storage, API readiness, site, and workspace. API and worker depend on healthy PostgreSQL, Redis, and object storage.

- [ ] **Step 3: Add local storage and seed structure**

Create named local volumes for PostgreSQL, Redis, and object storage. Add init-postgres.sql only for extensions or connection setup required by the foundation; do not seed business entities.

- [ ] **Step 4: Define the CI Compose file**

docker-compose.ci.yml must:

- use the same service names and images;
- avoid host port publication;
- use ephemeral volumes;
- expose dependency hostnames through the Compose network;
- start a migration runner before integration tests;
- support the Go integration-test tag;
- return non-zero when a healthcheck or migration fails.

- [ ] **Step 5: Add environment documentation**

.env.example must document APP_ENV, API_PORT, DATABASE_URL, REDIS_URL, OBJECT_STORAGE_ENDPOINT, OBJECT_STORAGE_ACCESS_KEY, OBJECT_STORAGE_SECRET_KEY, and CORS_ORIGINS with safe local examples that contain no real credentials.

- [ ] **Step 6: Test Compose locally**

Run:

~~~powershell
docker compose --env-file .env.example config
docker compose --env-file .env.example up -d postgres redis object-storage
docker compose --env-file .env.example ps
docker compose --env-file .env.example down -v
~~~

Expected: config validation passes, all dependencies become healthy, and the cleanup removes only the named project volumes.

- [ ] **Step 7: Add CI smoke scripts**

compose-smoke.ps1 and compose-smoke.sh must start CI Compose, wait for health, run migrations, invoke integration tests, collect logs on failure, and always tear down the Compose project.

- [ ] **Step 8: Commit Compose**

~~~powershell
git add docker-compose.yml docker-compose.ci.yml .env.example infra/local infra/ci/compose-smoke.ps1 infra/ci/compose-smoke.sh
git commit -m "chore: Add local and CI Compose environments"
~~~

### Task 3: Add provider-neutral CI commands

**Files:**
- Create: infra/ci/validate.ps1
- Create: infra/ci/validate.sh
- Create: infra/ci/integration.ps1
- Create: infra/ci/integration.sh
- Create: infra/ci/build-images.ps1
- Create: infra/ci/build-images.sh
- Modify: Taskfile.yml
- Modify: README.md

**Interfaces:**
- Every provider invokes the same validate, integration, build, security, and smoke commands.
- PowerShell is the Windows entrypoint; POSIX shell is the Linux CI entrypoint.
- No provider-specific pipeline YAML is created until the repository host is explicitly selected.

- [ ] **Step 1: Implement validation scripts**

validate scripts must run commitlint for the changed range, Prettier, TypeScript checks, Svelte/Astro checks, Go format verification, go test, go vet, OpenAPI validation, and migration validation. Stop at the first failure and preserve the exit code.

- [ ] **Step 2: Implement integration scripts**

integration scripts must:

1. start docker-compose.ci.yml;
2. wait for healthy dependencies;
3. run migrations;
4. run Go integration tests;
5. run web browser smoke tests;
6. collect service logs on failure;
7. tear down the Compose project in a finally/trap block.

- [ ] **Step 3: Implement image build scripts**

build-images scripts must build api, site, and workspace images with version, Git SHA, and build-time arguments. They must fail when a Dockerfile uses latest or contains a secret-like environment assignment.

- [ ] **Step 4: Add Taskfile orchestration**

Add platform-specific commands:

~~~yaml
  check:
    cmds:
      - cmd: powershell -File infra/ci/validate.ps1
        platforms: [windows]
      - cmd: sh infra/ci/validate.sh
        platforms: [linux, darwin]

  test:
    cmds:
      - cmd: powershell -File infra/ci/validate.ps1
        platforms: [windows]
      - cmd: sh infra/ci/validate.sh
        platforms: [linux, darwin]

  test:integration:
    cmds:
      - cmd: powershell -File infra/ci/integration.ps1
        platforms: [windows]
      - cmd: sh infra/ci/integration.sh
        platforms: [linux, darwin]

  docker:build:
    cmds:
      - cmd: powershell -File infra/ci/build-images.ps1
        platforms: [windows]
      - cmd: sh infra/ci/build-images.sh
        platforms: [linux, darwin]
~~~

Provide POSIX equivalents for Linux CI. README.md must document both local Windows and CI command forms.

- [ ] **Step 5: Test scripts**

Run:

~~~powershell
task check
task test
task docker:build
~~~

Expected: validation and image builds pass after web and backend plans are present. Before those plans are merged, the scripts must report the missing target clearly.

- [ ] **Step 6: Commit CI command layer**

~~~powershell
git add infra/ci Taskfile.yml README.md
git commit -m "chore: Add provider-neutral CI commands"
~~~

### Task 4: Add security and image checks

**Files:**
- Create: infra/ci/security.ps1
- Create: infra/ci/security.sh
- Create: infra/ci/sbom.ps1
- Create: infra/ci/sbom.sh
- Modify: Taskfile.yml
- Modify: README.md

**Interfaces:**
- Security command scans source dependencies, secrets, and built images.
- SBOM command emits one artifact per deployable image.
- CI fails on confirmed high-severity findings unless an ADR records the accepted exception.

- [ ] **Step 1: Define scanner versions**

Pin the scanner container image or binary version in the scripts. Do not download an unpinned latest binary during CI.

- [ ] **Step 2: Add source and image scans**

security scripts must run dependency audit, secret scan, filesystem scan, and image scan for API, site, and workspace. Scan results use machine-readable output for CI and a concise human-readable summary.

- [ ] **Step 3: Add SBOM generation**

sbom scripts generate SPDX or CycloneDX output for every release image and write artifacts under a CI output directory excluded from source commits.

- [ ] **Step 4: Add Taskfile commands**

~~~yaml
  security:
    cmds:
      - cmd: powershell -File infra/ci/security.ps1
        platforms: [windows]
      - cmd: sh infra/ci/security.sh
        platforms: [linux, darwin]

  sbom:
    cmds:
      - cmd: powershell -File infra/ci/sbom.ps1
        platforms: [windows]
      - cmd: sh infra/ci/sbom.sh
        platforms: [linux, darwin]
~~~

- [ ] **Step 5: Verify and commit**

~~~powershell
task security
task sbom
git add infra/ci/security.ps1 infra/ci/security.sh infra/ci/sbom.ps1 infra/ci/sbom.sh Taskfile.yml README.md
git commit -m "chore: Add security and SBOM checks"
~~~

### Task 5: Add semantic-versioning metadata and release validation

**Files:**
- Create: release/components.json
- Create: scripts/semver.mjs
- Create: scripts/version.mjs
- Create: scripts/semver.test.mjs
- Create: docs/decisions/001-versioning.md
- Modify: package.json
- Modify: Taskfile.yml
- Modify: services/api/internal/platform/buildinfo/buildinfo.go

**Interfaces:**
- Release manifest lists api, site, workspace, api-contracts, design-tokens, and ui-svelte.
- semver.mjs validates vMAJOR.MINOR.PATCH tags and component version changes.
- version.mjs emits version, Git SHA, and build time for package and Docker tasks.
- API BuildInfo receives the same version metadata as the image.

- [ ] **Step 1: Define component release metadata**

Create release/components.json:

~~~json
{
  "components": [
    { "name": "api", "path": "services/api", "versionFile": "services/api/VERSION" },
    { "name": "site", "path": "apps/site", "versionFile": "apps/site/package.json" },
    { "name": "workspace", "path": "apps/workspace", "versionFile": "apps/workspace/package.json" },
    { "name": "api-contracts", "path": "packages/api-contracts", "versionFile": "packages/api-contracts/package.json" },
    { "name": "design-tokens", "path": "packages/design-tokens", "versionFile": "packages/design-tokens/package.json" },
    { "name": "ui-svelte", "path": "packages/ui-svelte", "versionFile": "packages/ui-svelte/package.json" }
  ]
}
~~~

Create services/api/VERSION with 0.1.0-dev.

- [ ] **Step 2: Implement SemVer validation**

scripts/semver.mjs must reject tags without vMAJOR.MINOR.PATCH, prerelease identifiers that are not dot-separated, and component versions that are not valid SemVer. It must accept patch, minor, major, and prerelease fixtures.

- [ ] **Step 3: Implement build metadata generation**

scripts/version.mjs must emit a JSON object with version, gitSha, and buildTime. The API Docker build passes those values through ldflags. Site and workspace expose the version in a generated public build metadata file.

- [ ] **Step 4: Add release commands**

Add:

~~~json
{
  "scripts": {
    "release:validate": "node scripts/semver.mjs",
    "release:version": "node scripts/version.mjs"
  }
}
~~~

Add:

~~~yaml
  release:validate:
    cmds:
      - pnpm release:validate

  release:version:
    cmds:
      - pnpm release:version
~~~

- [ ] **Step 5: Write the versioning ADR**

docs/decisions/001-versioning.md must state:

- fix means patch;
- feat means minor;
- breaking changes mean major;
- API URL major version is independent from binary/package version;
- packages and deployables may release independently;
- images use SemVer plus Git SHA;
- latest is never a deployment tag.

- [ ] **Step 6: Test release fixtures**

Run:

~~~powershell
node scripts/semver.mjs --tag v0.1.1
node scripts/semver.mjs --tag v0.2.0
node scripts/semver.mjs --tag v1.0.0
node scripts/semver.mjs --tag release
~~~

Expected: the first three pass and the last command fails with a stable validation message.

- [ ] **Step 7: Verify and commit**

~~~powershell
task release:validate
task release:version
git add release scripts docs/decisions/001-versioning.md package.json Taskfile.yml services/api/VERSION services/api/internal/platform/buildinfo/buildinfo.go
git commit -m "chore: Add semantic release metadata"
~~~

### Task 6: Add CI smoke and release gates

**Files:**
- Create: infra/ci/smoke.ps1
- Create: infra/ci/smoke.sh
- Create: infra/ci/release.ps1
- Create: infra/ci/release.sh
- Modify: Taskfile.yml
- Modify: README.md

**Interfaces:**
- Smoke command checks API live/ready/version, public site, workspace app shell, workspace admin shell, and dependency connectivity.
- Release command validates the tag, builds images, scans images, generates SBOMs, and emits release artifacts.
- Production deployment is an external provider step that consumes the verified images.

- [ ] **Step 1: Implement post-deploy smoke checks**

smoke scripts must fail if any endpoint returns an unexpected status, if version metadata is missing, or if the app/admin shell text is absent. They must not mutate data.

- [ ] **Step 2: Implement release orchestration**

release scripts must run release validation, full build, Docker image build, security scan, SBOM generation, and artifact collection in order. A failed stage stops the release.

- [ ] **Step 3: Add Taskfile commands**

~~~yaml
  smoke:
    cmds:
      - cmd: powershell -File infra/ci/smoke.ps1
        platforms: [windows]
      - cmd: sh infra/ci/smoke.sh
        platforms: [linux, darwin]

  release:
    cmds:
      - cmd: powershell -File infra/ci/release.ps1
        platforms: [windows]
      - cmd: sh infra/ci/release.sh
        platforms: [linux, darwin]
~~~

- [ ] **Step 4: Verify and commit**

~~~powershell
task smoke
task release
git add infra/ci/smoke.ps1 infra/ci/smoke.sh infra/ci/release.ps1 infra/ci/release.sh Taskfile.yml README.md
git commit -m "chore: Add release and smoke gates"
~~~

### Task 7: Verify the infrastructure/release subsystem

**Files:**
- Test: infra/docker
- Test: docker-compose.yml
- Test: docker-compose.ci.yml
- Test: infra/ci
- Test: release
- Test: scripts

**Interfaces:**
- Consumes completed web and backend artifacts.
- Produces reproducible local, CI, image, security, SemVer, and smoke workflows.

- [ ] **Step 1: Validate Compose configuration**

~~~powershell
docker compose --env-file .env.example config
docker compose -f docker-compose.ci.yml config
~~~

Expected: both configurations parse without unresolved variables.

- [ ] **Step 2: Build images**

~~~task
task docker:build
~~~

Expected: API, site, and workspace images build without latest tags or secret warnings.

- [ ] **Step 3: Run dependency-backed integration**

~~~powershell
task test:integration
~~~

Expected: migrations, Go integration tests, and browser smoke tests pass through CI Compose.

- [ ] **Step 4: Run security and release validation**

~~~powershell
task security
task sbom
task release:validate
~~~

Expected: scans and artifacts complete with no unreviewed high-severity findings.

- [ ] **Step 5: Check the final diff**

~~~powershell
task format
git diff --check
git status --short
~~~

The subsystem is complete when local Compose, CI Compose, all images, security checks, SBOMs, SemVer validation, and smoke gates pass.
