# Naira

Naira is an outdoor trip and hiking planning platform for hikers and outdoor ecosystem participants.

This repository currently contains the technical foundation only. Complete trip, gear, itinerary, logistics, marketplace, and mobile business flows are intentionally outside this scaffold.

## Technology

- Astro and Svelte for the public web.
- SvelteKit for the authenticated planner and admin workspace.
- Go for the modular monolith API and worker.
- PostgreSQL as the source of truth.
- Redis for supporting infrastructure.
- Flutter as the future mobile client.
- Docker Compose for local and CI dependencies.

## Repository map

- apps/site: Astro public and discovery surface.
- apps/workspace: SvelteKit planner and admin surface.
- services/api: Go API and worker.
- packages: contracts, tokens, UI primitives, and tooling.
- clients/mobile: future Flutter handoff.
- infra: Docker, Compose, CI, security, and release scripts.
- docs: architecture, ADRs, specs, and implementation plans.
- .agents: normative agent guidance.

## Prerequisites

- Node.js 22 or the version pinned by the repository toolchain.
- Corepack-enabled pnpm.
- Go.
- Taskfile.
- Docker Desktop with Compose.

## Common commands

```powershell
corepack pnpm install
task dev
task check
task test
task test:integration
task build
task docker:build
task security
task sbom
task release
```

The API, site, workspace, and Compose commands are added as each foundation subsystem is installed. Read AGENTS.md and the .agents guides before changing code.

Docker image, Compose, security, SBOM, and release commands require Docker Desktop, the Compose plugin, and Trivy where applicable. CI providers should invoke the same Taskfile commands rather than duplicating them.

## Quality bar

Changes must preserve clean code, pragmatic SOLID boundaries, readability, testability, accessibility, security, and the approved commitlint rules. Prefer the smallest implementation that satisfies a tested requirement.
