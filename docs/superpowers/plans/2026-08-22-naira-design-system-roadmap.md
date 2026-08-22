# Naira Design System Implementation Roadmap

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Naira design system as independently testable
token, component, pattern, pilot-surface, documentation, and quality phases.

**Architecture:** `packages/design-tokens` remains the cross-platform source of
truth. `packages/ui-svelte` owns opinionated, accessible, Tailwind-backed web
components and reusable patterns. Astro and SvelteKit consume those packages;
product-specific domain recipes remain in the applications until they prove
reusable.

**Tech Stack:** TypeScript, Svelte 5, SvelteKit, Astro, Tailwind CSS 4.3.3 with
`@tailwindcss/vite` 4.3.3, Plus Jakarta Sans, CSS custom properties, Vitest,
Testing Library, Storybook, Playwright, pnpm, and generated Dart tokens.

**Spec:** [docs/superpowers/specs/2026-08-22-naira-design-system-design.md](../specs/2026-08-22-naira-design-system-design.md)

## Global Constraints

- Design system packages collectively own foundations, primitives, components,
  and reusable patterns; applications own domain recipes.
- Tailwind CSS is the implementation layer, not the source of truth.
- Components consume semantic tokens and do not use raw hex values directly.
- Plus Jakarta Sans is the primary typeface.
- The visual territory is earthy-natural base, warm adventure accent, and
  neutral premium surfaces.
- Light theme is implemented first; semantic contracts are dark-mode ready.
- `comfortable` and `compact` are shared density modes, not separate systems.
- Responsive behavior uses adaptive composition with a mobile-first baseline.
- WCAG 2.2 AA is mandatory; AAA is applied where feasible.
- Every applicable component has a documented state matrix and tests.
- Async UI uses the shared lifecycle `idle -> dirty -> saving -> queued/syncing -> synced`.
- Naira is Indonesian-first and localization-ready.
- Use TypeScript strict mode and avoid unexplained `any`.
- Keep components and functions focused, readable, and within the formatter's
  100-column print width.
- Use Vitest and Testing Library for component behavior, Storybook for living
  documentation, and Playwright for browser and visual checks.
- Do not add a dependency when a small native or local implementation is clear
  and sufficient.
- Every implementation slice ends with focused checks and a Conventional
  Commit using the repository's allowed types and scopes.

## Plan set

The approved spec covers independent subsystems, so implementation is split
into these executable plans:

1. [Foundations and Tailwind](2026-08-22-naira-design-system-foundations-plan.md)
2. [Core components and workbench](2026-08-22-naira-design-system-components-plan.md)
3. [Patterns and pilot surfaces](2026-08-22-naira-design-system-patterns-plan.md)
4. [Documentation, quality, and release](2026-08-22-naira-design-system-quality-plan.md)

## Dependency order

```text
Foundations and Tailwind
        |
        v
Core components and workbench
        |
        v
Patterns and pilot surfaces
        |
        v
Documentation, quality, and release
```

The quality plan may add checks while earlier plans are in progress, but its
final verification runs after the pilot surfaces exist.

## Execution checkpoints

### Checkpoint A: Foundations

Expected result:

- approved color research artifact and ADR;
- generated light/dark-ready CSS and Dart tokens;
- Tailwind utilities consuming semantic token variables;
- Plus Jakarta Sans loaded through a reproducible web path;
- density, layout, motion, icon, and data-visualization foundations tested.

Required checks:

```powershell
task ui:tokens:check
task ui:styles:check
```

### Checkpoint B: Components

Expected result:

- existing primitives migrated to the semantic token contract;
- core primitive and composite inventory implemented;
- Storybook state matrix available;
- component tests cover user-visible behavior and accessibility.

Required checks:

```powershell
task ui:check
task ui:workbench:build
```

### Checkpoint C: Pilots

Expected result:

- public landing/discovery pilot uses the custom system;
- planner workspace pilot uses adaptive composition and compact density;
- reusable patterns have no business API or persistence dependency;
- domain recipes are isolated from core UI package boundaries.

Required checks:

```powershell
task web:test:e2e
```

### Checkpoint D: Quality and release

Expected result:

- design-system documentation is complete enough for a new contributor;
- accessibility and visual checks run in CI;
- package boundaries and generated outputs are validated;
- SemVer metadata covers the design-system packages;
- architecture guide and ADRs match the implemented boundary.

Required checks:

```powershell
task check
task test
task build
```

## Final handoff

The design system implementation is ready for product feature work only when
all four plans are checked off, the two pilot surfaces pass browser checks, and
the working tree is clean after the final scoped commits.

