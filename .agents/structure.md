# Repository structure

```text
apps/site/                 Astro public and discovery surface
apps/workspace/            SvelteKit planner and admin surface
services/api/              Go API and worker
packages/api-contracts/    OpenAPI source and generated clients
packages/design-tokens/    Token source and generated platform outputs
packages/ui-svelte/        Reusable Svelte primitives and workbench
packages/tsconfig/         Shared TypeScript configuration
packages/eslint-config/    Shared ESLint configuration
clients/mobile/            Flutter handoff and future application
infra/                     Docker, Compose, CI, security, and release scripts
docs/                      Architecture, ADRs, specs, and implementation plans
tests/e2e/                 Cross-application browser tests
```

## Placement rules

- Page files compose features; they do not own domain rules.
- Feature components stay inside the application until reuse is proven.
- Shared packages contain contracts, tokens, primitives, or tooling—not product business logic.
- Go modules own their tables and queries.
- Migrations belong to services/api/migrations.
- Dockerfiles belong to infra/docker.
- Provider-neutral CI commands belong to infra/ci.
- Architecture decisions belong to docs/decisions.
- Agent rules belong to .agents.
