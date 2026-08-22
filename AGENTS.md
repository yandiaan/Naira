# Naira Agent Guide

Read these documents before changing the repository:

- .agents/architecture.md
- .agents/conventions.md
- .agents/structure.md
- .agents/testing.md

The four documents are normative together with this index. When a task changes an architecture boundary, update the relevant guide and an ADR in docs/decisions/.

For design-system work, also read:

- docs/design-system/README.md
- the approved spec in docs/superpowers/specs/
- the applicable plan in docs/superpowers/plans/

Every UI change must preserve the token-first boundary, semantic states,
responsive contract, accessibility checks, and Storybook documentation. When a
UI change changes a package boundary, token ownership, or platform contract,
update the relevant guide and an ADR in docs/decisions/.

Implementation rule: every implementation task must review and update the
applicable agent rule files in the same change when the rule, boundary, or
quality expectation is affected. Do not leave implementation guidance stale.

Code comment rule: do not add inline comments to code. The only permitted code
comments are JSDoc for TypeScript APIs and Go Doc for exported Go declarations.
