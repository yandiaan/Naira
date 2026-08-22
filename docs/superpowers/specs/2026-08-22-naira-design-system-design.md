# Naira Design System Design

- Status: Draft for user review
- Date: 2026-08-22
- Scope: Web-first design system with future Flutter parity
- Decision path: Brainstorming

## 1. Context

Naira needs a custom design system for public discovery, the planner workspace,
and the admin workspace. The system must feel distinctive and trustworthy,
while supporting dense operational work such as gear, logistics, itinerary,
route, weather, and synchronization states.

The design system must not be reduced to a component catalogue. It also covers
UX principles, visual foundations, responsive composition, accessibility,
content design, data visualization, async/offline states, documentation,
testing, governance, and release management.

The current technical foundation is:

- Astro for public/discovery pages.
- SvelteKit for the planner workspace and admin workspace.
- Svelte components in `packages/ui-svelte`.
- Cross-platform tokens in `packages/design-tokens`.
- Tailwind CSS as the planned web styling and utility layer.
- Storybook as the living component documentation.
- Flutter as a future consumer of shared design decisions and generated tokens.

## 2. Goals

1. Establish one Naira visual and interaction language across web surfaces.
2. Make mobile-first responsive behavior a component contract.
3. Provide a comprehensive, state-driven component and pattern inventory.
4. Make accessibility and content quality part of the definition of done.
5. Support light mode first while keeping the system dark-mode ready.
6. Support comfortable and compact density without creating separate systems.
7. Make public, workspace, admin, and future mobile consumers share decisions.
8. Keep the system custom and opinionated without unnecessary abstraction.
9. Allow domain recipes to evolve without coupling the core UI package to APIs
   or business workflows.
10. Provide enough documentation and governance for long-term maintenance.

## 3. Non-goals

- Reproducing Material, Ant, Polaris, Spectrum, or another existing system.
- Building every domain workflow before a real consumer exists.
- Exposing a second headless API solely for theoretical flexibility.
- Making Tailwind configuration the source of truth for design decisions.
- Locking a final color hex palette before contrast and product-context tests.
- Implementing Flutter components in the first web design-system phase.

## 4. Product and visual direction

### 4.1 Experience character

Naira uses a hybrid character:

- Public discovery is calm, premium, visual, and inspiring.
- Planner and admin experiences are fast, clear, dense, and operational.
- The system remains recognizably Naira in both contexts.

### 4.2 Visual territory

The starting territory is:

- earthy-natural base;
- warm adventure accent;
- neutral premium surfaces.

This is a starting hypothesis, not a final palette. The color research must
produce multiple candidates and test them against public content, planner
controls, maps, data visualization, light mode, dark mode, and accessibility.

### 4.3 Typography

Plus Jakarta Sans is the primary typeface candidate and is approved as the
initial Naira typeface. It is a strong fit because it provides a modern,
approachable geometric character, supports variable weights, and is available
under the SIL Open Font License 1.1.

Initial usage guidance:

- Body text: 400.
- Supporting text: 400-500.
- Labels and controls: 500-600.
- Headings: 600-700.
- Public hero/display text: 700-800.
- Planner and admin data: use tabular figures where appropriate.

The typeface must be tested with Indonesian content, long labels, dates, units,
numeric tables, itinerary text, weather data, and responsive truncation before
the final type scale is declared stable.

## 5. Design system layers

The system is layered from the most general decisions to product recipes:

1. Principles: UX, brand, content, accessibility, and responsive principles.
2. Foundations: tokens, typography, color, layout, iconography, motion, and
   density.
3. Primitives: small semantic building blocks and form controls.
4. Components: composed, styled, accessible Naira components.
5. Patterns: repeatable task and layout solutions.
6. Templates and shells: public, planner, and admin page structures.
7. Domain recipes: Naira-specific compositions such as gear, itinerary, route,
   weather, and logistics.

The design-system packages collectively own layers 2-5. Product applications
initially own layer 7. A domain recipe may move into a shared package only
after it is reusable across multiple surfaces and has a stable contract.

## 6. Package boundaries

### 6.1 `packages/design-tokens`

This package owns the source data and transformation of design decisions.

It contains:

- primitive values;
- semantic aliases;
- component token aliases when necessary;
- light theme values;
- dark-ready theme mappings;
- comfortable and compact density values;
- typography and motion tokens;
- data-visualization and outdoor semantic tokens;
- generated CSS and Dart outputs.

It must not contain Svelte component behavior, product data, or API knowledge.

### 6.2 `packages/ui-svelte`

This package owns the opinionated Naira web UI.

It contains:

- accessible component behavior;
- Naira visual styling;
- responsive composition;
- variants, sizes, density, and state contracts;
- Storybook stories and component tests;
- reusable non-domain patterns.

It must not contain business rules, data fetching, persistence, or sync logic.

### 6.3 Applications

- `apps/site` composes public/discovery experiences.
- `apps/workspace` composes planner and admin experiences.
- Applications own route-level orchestration and domain recipes.
- API calls and product state remain outside the design-system package.

### 6.4 Future Flutter

Flutter consumes the same design decisions and generated Dart tokens. It does
not need to copy web implementation details. Native platform behavior may be
used where it improves accessibility, performance, or mobile ergonomics.

## 7. Token architecture

The token flow is:

`primitive tokens -> semantic tokens -> component tokens`

### 7.1 Primitive tokens

Primitive tokens represent raw scales and values, such as palette ramps,
spacing steps, font weights, radii, elevations, and motion durations. They are
reference material and should rarely be consumed directly by components.

### 7.2 Semantic tokens

Semantic tokens express intent, such as:

- `surface.canvas`;
- `surface.elevated`;
- `content.primary`;
- `content.muted`;
- `border.default`;
- `action.primary`;
- `focus.indicator`;
- `status.success`;
- `status.warning`;
- `status.danger`;
- `route.primary`;
- `terrain.elevation`;
- `weather.precipitation`.

Components should consume semantic tokens rather than raw color or spacing
values.

### 7.3 Component tokens

Component tokens are created only when a component needs a stable, local
decision that should not leak into unrelated components. They normally alias
semantic tokens.

### 7.4 Tailwind integration

Tailwind is the implementation layer. Generated CSS variables and semantic
theme mappings are exposed to Tailwind utilities. Arbitrary values are allowed
only when a documented exception is justified; they must not become an
unmanaged second token system.

## 8. Theme and density

### 8.1 Theme

- Light theme is implemented first.
- Semantic contracts are dark-mode ready from the beginning.
- Components must not contain hardcoded light/dark business logic.
- Theme-specific values are resolved by tokens.
- Contrast is tested per theme and per applicable state.

### 8.2 Density

The system has shared density modes:

- `comfortable`: public web and default product interaction.
- `compact`: data-heavy planner and admin contexts.

Density changes spacing and sizing where appropriate, but does not remove
minimum readability or touch-target requirements on mobile. Density is not a
separate component system.

## 9. Color architecture and research

The color model separates:

1. Brand palette: forest/lichen, warm adventure accent, and supporting earth
   tones.
2. Semantic palette: success, warning, danger, info, and neutral meanings.
3. Data-visualization palette: charts, route, elevation, weather, progress, and
   category series.
4. Surface and content palette: theme-aware layers for light and dark mode.

Brand colors must not automatically represent status meanings. Status and data
visualization must use labels, icons, patterns, line styles, or shapes in
addition to color.

The research deliverable is:

- benchmark of relevant mobility, travel, outdoor, and design-system patterns;
- three candidate Naira palettes;
- light and dark semantic mappings;
- contrast matrix;
- color-vision and color-only communication review;
- public-web specimen;
- planner/workspace specimen;
- map and chart specimen;
- final palette decision recorded in an ADR.

Initial research observations:

- Gojek's public brand book uses multiple category colors, while Grab's brand
  centre is strongly centered on green.
- Airbnb protects a distinctive warm brand color and explicitly requires other
  brands to remain visually distinct.
- Spectrum and Primer both reinforce the base-to-semantic-to-component token
  model, including theme-aware functional color roles.

These observations are directional references only. Naira will not copy their
brand colors, assets, or component styling.

## 10. Iconography and imagery

- Use a base icon set behind a single Naira `Icon` API.
- Keep size, stroke, optical alignment, color, and accessibility behavior
  consistent.
- Add custom domain icons incrementally for gear, trail, campsite, weather,
  elevation, and itinerary concepts.
- Decorative icons must be distinguishable from informative icons.
- Meaningful icons require an accessible label or adjacent text.
- Public imagery can be expressive; planner imagery must not compete with task
  clarity or data readability.

## 11. Motion

Motion is a purposeful system, not decoration.

- Use motion to explain cause-and-effect, hierarchy, feedback, progress, and
  spatial transitions.
- Define duration, easing, distance, and reduced-motion tokens.
- Support `prefers-reduced-motion`.
- Loading, syncing, conflict, and error states must remain understandable
  without animation.
- Avoid continuous decorative motion and expensive effects on mobile.

## 12. Responsive composition

Responsive behavior is adaptive composition with a mobile-first baseline.

- Mobile and desktop share one component API.
- A layout may change composition at a breakpoint, not only scale down.
- Public navigation may become bottom navigation or a compact menu on mobile.
- Desktop filters may become a drawer or bottom sheet on mobile.
- Desktop dialogs may become sheets on mobile.
- Multi-column forms stack on mobile.
- Dense tables may become prioritized cards or lists where appropriate.
- Planner split panes may become stacked or step-based mobile compositions.
- Responsive behavior is documented as a component contract.

The first validation uses two pilots:

1. Public landing/discovery page.
2. Planner workspace shell.

The public pilot tests brand, typography, color, imagery, and storytelling. The
workspace pilot tests density, navigation, form behavior, state handling,
offline/sync feedback, and data-heavy responsive behavior.

## 13. Accessibility contract

Naira targets WCAG 2.2 AA as the mandatory baseline, with AAA applied where it
is feasible and does not damage usability.

Every applicable component must cover:

- semantic HTML;
- keyboard navigation;
- visible and non-obscured focus;
- accessible name, role, value, and status messages;
- contrast and non-text contrast;
- reflow and zoom behavior;
- reduced motion;
- error identification and recovery;
- no color-only communication;
- usable pointer and touch targets;
- screen-reader state changes.

Accessibility is validated through component tests, Storybook checks, browser
tests, and manual review for interaction-heavy components.

## 14. Component state contract

Every component defines the states that apply to it:

- default;
- hover;
- focus-visible;
- pressed/active;
- selected/checked;
- disabled;
- loading/pending;
- invalid/error;
- success/confirmed;
- readonly;
- empty/no-data;
- offline;
- syncing;
- conflict;
- destructive/confirmation.

The state matrix is part of the component API, Storybook documentation, and
test plan. State meaning must not depend on color alone.

## 15. Async, offline, and sync contract

The shared visual state lifecycle is:

`idle -> dirty -> saving -> queued/syncing -> synced`

With explicit branches for:

- offline;
- retryable failure;
- blocked action;
- conflict;
- manual resolution.

Components display these states but do not own persistence or synchronization
logic. Actions such as retry, discard, resolve, and continue offline use shared
patterns.

## 16. Data visualization and outdoor semantics

The data-visualization system is separate from brand and status colors.

- Route difficulty, elevation, weather, progress, and logistics have stable
  semantic mappings.
- A color signal is paired with text, icon, shape, pattern, or line style.
- Map overlays use outlines, halos, labels, and contrast-aware treatment.
- Chart tokens cover axes, grid, labels, tooltip, threshold, highlight, and
  series colors.
- Dark-mode mappings are defined independently.
- Compact density may be used for data-heavy views without reducing clarity.

## 17. Content design

Naira is Indonesian-first and localization-ready.

- Component text is supplied by consumers or content configuration.
- UI copy uses clear, concise, sentence-case Indonesian.
- Labels use action-oriented verbs.
- Error messages explain the problem and the next action.
- Empty states provide context and a useful next step.
- Date, time, number, unit, timezone, pluralization, and text expansion are
  locale-aware.
- Voice is warm, clear, calm, helpful, and safety-conscious.
- Avoid jargon, blame, false urgency, and unexplained technical terminology.

## 18. Component inventory and delivery

### Phase 0: foundations

Tokens, themes, density, layout, typography, iconography, motion, accessibility,
content, and data-visualization foundations.

### Phase 1: core primitives

Layout primitives, text, links, buttons, fields, basic inputs, selection
controls, badges, status, loading, progress, alerts, empty/error states,
offline banner, and sync status.

### Phase 2: composite components

Select, combobox, calendar, date/time picker, popover, tooltip, menus, dialog,
drawer, toast, tabs, accordion, breadcrumb, pagination, stepper, table, list,
timeline, metric, search, filters, and navigation.

### Phase 3: reusable patterns

Forms, search/filter experiences, list-detail, create/edit, confirmations,
async states, bulk actions, onboarding, uploads, responsive actions, and page
shells.

### Phase 4: Naira domain recipes

Trip summary, gear checklist, itinerary, logistics, route, elevation, weather,
packing progress, and shared trip/member states.

## 19. Documentation and governance

- Storybook is the living component documentation.
- `docs/design-system/` contains principles, foundations, patterns,
  accessibility, content, and migration guidance.
- Every component page follows a shared documentation template.
- A new component requires a clear consumer and documented rationale.
- API or behavior changes use an RFC or ADR when the decision affects a system
  boundary.
- Breaking changes require migration guidance.
- Deprecated components have a transition period before removal.
- Design tokens and UI packages follow semantic versioning.
- If Figma is introduced, repository tokens remain the canonical source and
  design values must not be manually duplicated.

## 20. Quality gates

Every component or pattern must satisfy the applicable gates:

- typecheck;
- lint and formatting;
- unit/component test;
- accessibility test;
- Storybook story for variants and state matrix;
- responsive behavior test;
- visual regression for stable visual surfaces;
- package boundary check;
- documentation review;
- consumer example in a pilot surface.

The design-system CI should also validate generated token outputs, Storybook
build, package exports, and SemVer/release metadata.

## 21. Open decisions before implementation

1. Final color candidates and semantic mapping.
2. Final type scale, line-height, and letter-spacing values.
3. Base icon set selection and license review.
4. Exact responsive breakpoints and layout grid.
5. Final component API conventions for Svelte 5.
6. Visual regression tooling and snapshot ownership.
7. Design-system package release and changelog workflow.
8. ADR updates for finalized package boundaries.

These decisions do not block the design model, but they must be resolved before
the related implementation phase begins.

## 22. Reference research

- [Awesome Design Systems](https://github.com/alexpate/awesome-design-systems)
- [Adobe Spectrum design tokens](https://spectrum.adobe.com/page/design-tokens/)
- [GitHub Primer color usage](https://primer.style/product/getting-started/foundations/color-usage/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Plus Jakarta Sans](https://github.com/tokotype/PlusJakartaSans)
- [Gojek Brand Book](https://lelogama.go-jek.com/gojeks_brand_guideline.pdf)
- [Grab Brand Centre](https://merchant.grab.com/en-my/brand-centre/grab)
- [Airbnb Trademark Guidelines](https://www.airbnb.com/help/article/3233)
