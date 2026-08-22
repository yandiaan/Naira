# Naira Responsive Foundations

Naira uses adaptive composition with a mobile-first baseline.

## Rules

- Components share one API across mobile and desktop.
- A layout may change composition at a breakpoint rather than only shrink.
- Public discovery uses comfortable spacing and expressive content hierarchy.
- Planner and admin data regions may opt into compact density.
- Filters can become drawers or bottom sheets on mobile.
- Dialogs can become sheets on mobile.
- Multi-column forms stack on mobile.
- Dense tables must provide a prioritized mobile representation instead of
  forcing horizontal scrolling for primary actions.
- Planner split panes become stacked or step-based mobile compositions.

Responsive behavior belongs in component and pattern documentation. It must be
tested at the mobile and desktop projects used by Playwright.
