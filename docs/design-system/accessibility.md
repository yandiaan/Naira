# Naira Accessibility Contract

Naira targets WCAG 2.2 AA as the mandatory baseline and applies AAA where it
is feasible without damaging usability.

## Component requirements

- Use semantic HTML before ARIA.
- Provide accessible names, roles, values, and status messages.
- Keep focus visible and non-obscured.
- Support keyboard operation and Escape behavior where applicable.
- Test contrast and non-text contrast per theme and state.
- Do not use color as the only status or data signal.
- Support reflow, zoom, reduced motion, and touch interaction.
- Associate labels, descriptions, and errors with their controls.
- Provide useful recovery actions for error, offline, and conflict states.

Storybook a11y checks and Playwright axe checks are required for pilot surfaces.
Interaction-heavy overlays also require manual keyboard and screen-reader
review.
