# ADR 001: Independent semantic versioning

- Status: Accepted
- Date: 2026-08-21

## Context

Naira has multiple deployables and shared contracts that may need to release independently. API URL compatibility and package/build versions have different audiences.

## Decision

- A patch fixes behavior without changing the public contract.
- A minor release adds backward-compatible behavior.
- A major release changes a public contract incompatibly.
- API URL major versions such as /api/v1 are independent from binary/package versions.
- API, site, workspace, api-contracts, design-tokens, and ui-svelte have independent version metadata.
- Docker images use SemVer plus Git SHA and never use latest for deployment.
- Conventional commit types support release review but do not silently publish a release.

## Alternatives considered

- One version for the whole monorepo: rejected because independent deployables would create unrelated release noise.
- Automatic release from every commit: rejected until CI provider and approval policy are selected.

## Consequences

Release manifests and build metadata must identify the component being released. API compatibility still requires an explicit contract review even when the binary version is a patch release.

## Trigger for revisiting

Revisit when release ownership, registry publishing, or production deployment provider is selected.
