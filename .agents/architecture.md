# Architecture rules

## Product surfaces

- Astro owns public and discovery rendering.
- SvelteKit owns authenticated application and admin routing.
- Go owns API authorization, application use cases, and business boundaries.
- Flutter consumes the versioned API in a future mobile phase.

## Dependency direction

```text
transport -> application -> domain
adapters  -> ports
```

- Domain code must not import HTTP, PostgreSQL, Redis, object storage, or framework code.
- Application code depends on small ports; adapters implement those ports.
- Clients never access PostgreSQL, Redis, or object storage directly.
- PostgreSQL is authoritative; Redis is supporting infrastructure only.
- Modules communicate through explicit application ports or service interfaces.
- A module may not read another module's tables directly.
- Microservices require a reviewed ADR with a measured ownership or scaling reason.

## Clean architecture principles

- Keep boundaries explicit and narrow.
- Prefer high cohesion within a module and low coupling between modules.
- Use dependency inversion at external boundaries, not as an excuse to create interfaces for every function.
- Keep side effects at adapters and composition roots.
- Make transaction boundaries visible in application services.
- Keep authorization in the backend; frontend visibility is not a security boundary.
- Use structured errors, stable error codes, request IDs, and audit metadata.

## Offline readiness

- Synchronized entities use version and tombstone metadata where applicable.
- Stale mutations return conflict instead of silently overwriting collaborative data.
- Idempotency keys and mutation IDs are required for retryable writes.

## Design system boundary

- `packages/design-tokens` owns authored tokens and generated CSS/Dart outputs.
- `packages/ui-svelte` owns opinionated accessible components and generic
  patterns; it does not call APIs or own persistence, auth, or sync logic.
- Tailwind CSS consumes generated semantic variables and is not a second token
  source.
- `apps/site` owns public composition; `apps/workspace` owns planner/admin
  composition and domain recipes.
- Domain recipes remain application-local until reuse across surfaces is proven.
- Future Flutter consumes shared token decisions and Dart outputs while using
  native behavior where it improves mobile ergonomics.
