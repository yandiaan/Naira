# Naira Foundations

The foundations package is the shared language for public web, planner,
admin, and future Flutter consumers.

## Sources and outputs

- Authored source: `packages/design-tokens/tokens.json`.
- Generator: `packages/design-tokens/scripts/build.mjs`.
- Web output: `packages/design-tokens/src/generated/tokens.css`.
- Flutter output: `packages/design-tokens/src/generated/tokens.dart`.
- Web styling layer: `packages/ui-svelte/src/styles.css`.

Do not edit generated files. Run `task ui:tokens:check` after changing the
source token file.

## Token layers

1. Primitive values describe scales and raw palette values.
2. Semantic values describe intent such as surface, content, action, status,
   focus, route, terrain, and weather.
3. Component values are local aliases created only when a component needs a
   stable decision that should not leak into unrelated components.

Components consume semantic values. Raw hex values do not belong in component
source.

## Themes and density

- Light theme is the default output.
- Dark theme is activated by `data-theme="dark"`.
- `comfortable` is the default interaction density.
- `compact` is available for data-heavy planner and admin regions.
- Mobile touch targets and readability remain mandatory in both densities.

## Typography, motion, and iconography

- Plus Jakarta Sans is the primary typeface.
- Motion communicates cause-and-effect, feedback, progress, or spatial change.
- Reduced motion is supported through the shared stylesheet.
- Icons are consumed through the Naira `Icon` API.

See [iconography](./iconography.md) and the color research artifact for the
current visual decisions.
