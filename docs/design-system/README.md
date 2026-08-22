# Naira Design System

Naira Design System is the shared UX, visual, interaction, accessibility, and
implementation language for public discovery, planner workspace, admin, and
future Flutter consumers.

## Start here

- [Approved design spec](../superpowers/specs/2026-08-22-naira-design-system-design.md)
- [Implementation roadmap](../superpowers/plans/2026-08-22-naira-design-system-roadmap.md)
- [Foundations](./foundations.md)
- [Responsive foundations](./responsive.md)
- [Accessibility contract](./accessibility.md)
- [Color research](./color-research.md)
- [Iconography](./iconography.md)
- [Content guidance](./content.md)
- [Component documentation template](./component-documentation-template.md)
- [Contribution and governance](./contributing.md)
- [Release guidance](./releasing.md)

## Package boundaries

- `packages/design-tokens` owns authored tokens and generated CSS/Dart outputs.
- `packages/ui-svelte` owns reusable, opinionated Svelte components and patterns.
- `apps/site` owns public discovery composition.
- `apps/workspace` owns planner/admin composition and domain recipes.

The design system does not own API calls, authentication, persistence, or
business workflows.

## Definition of done

A component or pattern is not complete until its API, applicable state matrix,
responsive behavior, accessibility behavior, content guidance, Storybook
story, focused test, and consumer example are reviewed.
