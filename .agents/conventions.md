# Code conventions

## Clean Code

- Use intention-revealing names; avoid unexplained abbreviations.
- Keep functions and components focused on one responsibility.
- Prefer a straight, readable control flow over clever compression.
- Keep public APIs small and explicit.
- Remove dead code instead of commenting it out.
- Avoid boolean flags that make one function serve unrelated behaviors.
- Keep validation and error handling at trust boundaries.
- Prefer composition over inheritance.
- Use constants for domain values that have a stable name and meaning.
- Do not create generic utils, helpers, services, or repositories as dumping grounds.

## SOLID, applied pragmatically

- Single Responsibility: one module, component, or function has one reason to change.
- Open/Closed: extend through stable ports at external boundaries; do not add speculative plugin systems.
- Liskov Substitution: every adapter must honor the behavior and error contract of its port.
- Interface Segregation: define small consumer-owned interfaces instead of one broad service interface.
- Dependency Inversion: application and domain code depend on ports; composition roots choose concrete adapters.

SOLID never overrides readability or YAGNI. An abstraction with one consumer and no external boundary needs a concrete implementation first.

## TypeScript and Svelte

- TypeScript strict mode is mandatory.
- Do not use any without a documented, local reason; prefer unknown with narrowing.
- Use consistent type-only imports.
- Keep server state, UI state, session state, and offline state separate.
- Keep business rules out of page components and templates.
- Components use semantic HTML, accessible names, visible focus, and explicit loading/error/empty/offline states.
- Formatter print width is 100.

## Go

- Run gofmt, go vet, and static analysis.
- Keep domain and application packages independent of transport and storage.
- Use explicit SQL through the typed database boundary.
- Wrap errors with context while preserving stable error codes at the transport boundary.
- Avoid package-level mutable state and hidden singleton dependencies.

## API and data

- API paths are versioned under /api/v1.
- Errors use the shared error envelope with code, message, details, and requestId.
- Timestamps are UTC.
- Redis keys have a namespace and an explicit TTL when data is temporary.
- Secrets, tokens, passwords, and unredacted sensitive data never appear in logs.

## Git and commit messages

Commitlint is authoritative:

- allowed types: chore, docs, style, feat, fix, refactor, test;
- subject case: sentence-case;
- allowed scopes: ui, api, or empty;
- Co-authored-by trailers are forbidden.

Because sentence-case is enforced by the installed commitlint rule, commit subjects begin with an uppercase letter after the colon, for example:

```text
feat(api): Add health endpoint
```
