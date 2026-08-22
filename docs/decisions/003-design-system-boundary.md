# ADR 003: Design system package boundaries

- Status: Accepted
- Date: 2026-08-22

## Context

Naira now has a custom, token-first design system used by Astro public pages,
SvelteKit planner/admin pages, and a future Flutter client. Without an explicit
boundary, components can become coupled to APIs, sessions, persistence, or
domain workflows and the public/workspace surfaces can drift apart.

## Decision

- `packages/design-tokens` owns authored tokens and generated CSS/Dart outputs.
- `packages/ui-svelte` owns opinionated, accessible Svelte components and
  reusable generic patterns.
- Tailwind CSS is the web implementation layer and consumes generated semantic
  token variables; it is not a second source of design values.
- `apps/site` owns public/discovery composition.
- `apps/workspace` owns planner/admin composition and domain recipes.
- Domain recipes remain application-local until reuse across surfaces is proven.
- UI packages must not call APIs, own persistence, parse session providers, or
  implement synchronization logic.
- Flutter consumes shared token decisions and generated Dart outputs but may
  use native component behavior.
- Storybook, Vitest/Testing Library, axe, and Playwright are part of the UI
  quality boundary.

## Alternatives considered

- One mega-package containing domain workflows: rejected because it couples
  reusable UI to product business rules.
- Separate public and workspace design systems: rejected because it duplicates
  foundations and creates inconsistent semantics.
- Headless and styled APIs from the start: rejected because the current product
  needs one opinionated experience and a second API would increase maintenance.

## Consequences

Shared UI can evolve independently from API and domain modules. Application
teams must keep domain recipes local until reuse is demonstrated. Token changes
need CSS/Dart generation and theme/accessibility review. Package-level SemVer
and Storybook quality gates are required for public UI changes.

## Trigger for revisiting

Revisit when a second web framework becomes a supported consumer, Flutter needs
shared behavior beyond tokens, or a domain recipe is reused across at least two
independent product surfaces.
