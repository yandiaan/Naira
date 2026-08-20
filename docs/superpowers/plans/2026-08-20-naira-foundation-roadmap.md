# Naira Foundation Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Naira's technical foundation as independently testable repository, web, backend, and infrastructure subsystems without implementing the business flow.

**Architecture:** Use a pnpm monorepo for TypeScript applications and packages, an Astro public site, a SvelteKit application workspace for planner and admin surfaces, and a Go modular monolith behind a versioned OpenAPI contract. PostgreSQL is authoritative, Redis is supporting infrastructure, and Docker/Compose provides reproducible local and CI dependencies.

**Tech Stack:** TypeScript, Astro, Svelte, SvelteKit, Go, PostgreSQL, Redis, Flutter-compatible OpenAPI contracts, Docker, Docker Compose, pnpm, Vitest, Playwright, Go testing, and Flutter testing conventions.

**Spec:** `docs/superpowers/specs/2026-08-20-naira-foundation-design.md`

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
- The foundation does not implement complete trip, gear, logistics, or itinerary business flows.
- Code must be modular without overengineering, with readability as a primary review criterion.
- Commitlint must use the approved type, sentence-case subject, `ui`/`api`/empty scope, and no `Co-authored-by` trailer.
- Components and functions must avoid unnecessarily long lines; formatter print width is 100 where supported.
- The root `AGENTS.md` must reference `.agents/architecture.md`, `.agents/conventions.md`, `.agents/structure.md`, and `.agents/testing.md`.
- Dockerfiles must be multi-stage, non-root, reproducible, and free of baked-in secrets.
- Docker Compose must support local development and CI integration dependencies.
- Semantic versioning applies independently to contracts, shared packages, services, and applications.

---

## Decomposition and execution order

The approved spec contains four independently reviewable subsystems. Execute them in this order:

1. [Tooling and governance plan](2026-08-20-naira-tooling-governance-plan.md)
2. [Web and design-system plan](2026-08-20-naira-web-design-system-plan.md)
3. [Backend and API plan](2026-08-20-naira-backend-api-plan.md)
4. [Infrastructure and release plan](2026-08-20-naira-infrastructure-release-plan.md)

```text
Tooling/governance
        │
        ├───────────────┐
        ▼               ▼
Web/design system   Backend/API contract
        └───────┬───────┘
                ▼
        Infrastructure/release
```

The web plan and backend plan can be developed in parallel after the tooling plan, but the infrastructure plan starts only after both produce buildable artifacts and commands.

## Roadmap tasks

### Task 1: Establish repository governance

**Files:**
- Execute: `docs/superpowers/plans/2026-08-20-naira-tooling-governance-plan.md`

**Deliverable:** A clean monorepo root with pnpm configuration, formatter/lint baseline, exact commitlint rules, hooks, Taskfile commands, modular agent guides, and a README that explains how to run checks.

- [ ] Read the tooling/governance plan before editing files.
- [ ] Execute each task in that plan in order.
- [ ] Confirm `task check` and the commitlint pass/fail fixtures behave as specified.
- [ ] Commit the subsystem with `chore: establish repository governance`.

### Task 2: Build the web and design-system foundation

**Files:**
- Execute: `docs/superpowers/plans/2026-08-20-naira-web-design-system-plan.md`

**Deliverable:** Buildable Astro public site, SvelteKit workspace with `(app)` and `(admin)` route boundaries, token package, reusable Svelte primitives, component workbench, and browser smoke tests.

- [ ] Read the web/design-system plan and confirm Task 1 outputs exist.
- [ ] Execute tokens before UI primitives.
- [ ] Execute UI primitives before application shells.
- [ ] Confirm both applications build and the shell smoke test passes.
- [ ] Commit the subsystem with `feat(ui): add web foundation shells`.

### Task 3: Build the backend and API foundation

**Files:**
- Execute: `docs/superpowers/plans/2026-08-20-naira-backend-api-plan.md`

**Deliverable:** Buildable Go API and worker entrypoints, versioned OpenAPI contract, health/readiness/version endpoints, typed platform adapters, structured errors, authentication/authorization boundaries, migration baseline, and integration-test hooks.

- [ ] Read the backend/API plan and confirm Task 1 outputs exist.
- [ ] Define the OpenAPI health and version contract before generating clients.
- [ ] Implement platform adapters and error/middleware behavior before module shells.
- [ ] Confirm `go test ./...`, contract validation, and API build pass.
- [ ] Commit the subsystem with `feat(api): add backend foundation`.

### Task 4: Add infrastructure and release automation

**Files:**
- Execute: `docs/superpowers/plans/2026-08-20-naira-infrastructure-release-plan.md`

**Deliverable:** Multi-stage Dockerfiles, local and CI Compose files, provider-neutral CI commands, image validation, security checks, SemVer validation, and release metadata.

- [ ] Read the infrastructure/release plan and confirm web and backend artifacts build locally.
- [ ] Build each image independently.
- [ ] Run dependency-backed integration tests through CI Compose.
- [ ] Validate a patch, minor, and breaking SemVer release fixture.
- [ ] Commit the subsystem with `chore: add infrastructure release workflow`.

## Final integration gate

- [ ] Run `task check`.
- [ ] Run `task test`.
- [ ] Run `task test:integration` with `docker-compose.ci.yml`.
- [ ] Run `task build`.
- [ ] Build all Docker images without using `latest`.
- [ ] Verify `/health/live`, `/health/ready`, and `/version` from the API image.
- [ ] Verify site and workspace browser smoke tests.
- [ ] Verify `git status --short` is empty after the final integration commit.

The roadmap is complete when all four subsystem plans have passed their own acceptance criteria and the final integration gate is green. Business-flow implementation begins in a separate plan after this foundation is delivered.
