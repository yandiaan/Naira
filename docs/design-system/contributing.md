# Contributing to Naira Design System

## Before adding a component

1. Identify a real consumer in public, planner, or admin UI.
2. Search existing components and patterns for a composable solution.
3. Define the semantic HTML and accessibility behavior.
4. Define the state matrix and responsive contract.
5. Confirm the component belongs in `packages/ui-svelte` rather than an app.

Domain recipes stay in an application until reuse across surfaces is proven.

## Review gates

- TypeScript/Svelte check is clean.
- Focused behavior tests cover user-visible outcomes.
- Storybook documents variants and applicable states.
- Accessibility and responsive behavior are reviewed.
- No raw color or spacing values appear in component source.
- No business logic, API call, persistence, or session provider enters the UI
  package.

## Architecture decisions

Use an ADR when a change affects package boundaries, token ownership, dependency
direction, platform parity, accessibility policy, or release behavior. Use a
small RFC note when the decision is local but affects multiple components.

## Deprecation

Mark the component or prop as deprecated, document the replacement, keep a
transition period, and remove it only in a planned breaking release.
