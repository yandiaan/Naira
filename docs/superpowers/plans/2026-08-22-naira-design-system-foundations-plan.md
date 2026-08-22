# Naira Design System Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Build the token, theme, density, Tailwind, typography, icon,
motion, accessibility, and data-visualization foundations consumed by every
Naira web surface.

**Architecture:** The token JSON remains the only authored design-value source.
The token engine emits CSS variables and Dart constants. Tailwind CSS 4.3.3
consumes semantic CSS variables through its Vite plugin and theme variables;
Svelte components never become a second token source.

**Tech Stack:** TypeScript, Node ESM, Tailwind CSS 4.3.3,
\`@tailwindcss/vite\` 4.3.3, Plus Jakarta Sans variable font 5.3.0, Lucide
Svelte 1.0.1, Vitest, CSS custom properties, and generated Dart output.

**Spec:** [docs/superpowers/specs/2026-08-22-naira-design-system-design.md](../specs/2026-08-22-naira-design-system-design.md)

## Global Constraints

- Primitive values are reference material; components consume semantic tokens.
- Brand, semantic status, and data-visualization colors are separate palettes.
- Light theme is implemented first and dark theme is contract-ready.
- \`comfortable\` and \`compact\` are shared density modes.
- Plus Jakarta Sans is the primary typeface.
- WCAG 2.2 AA is the mandatory baseline.
- No color-only communication is allowed for status or data visualization.
- Tailwind is the styling layer, not the source of design decisions.
- Use no raw hex values in Svelte component styles.
- Keep functions and modules focused, readable, and within 100 columns.
- Use Vitest for token and tooling behavior tests.
- Keep generated files deterministic and never edit them manually.
- Do not add an abstraction without a current consumer.

---

### Task 1: Establish color research and contrast tooling

**Files:**
- Create: \`docs/design-system/color-research.md\`
- Create: \`docs/design-system/color-contrast-matrix.md\`
- Create: \`docs/decisions/002-color-system.md\`
- Create: \`packages/design-tokens/src/contrast.ts\`
- Create: \`packages/design-tokens/test/contrast.test.ts\`
- Modify: \`packages/design-tokens/src/index.ts\`

**Interfaces:**
- Produces \`contrastRatio(foreground: string, background: string): number\`.
- Produces \`meetsContrast(foreground: string, background: string, level: 'AA' | 'AAA', largeText?: boolean): boolean\`.
- Produces one selected Naira palette with light and dark semantic mappings.
- Consumes the approved territory: forest/lichen base, warm adventure accent,
  and neutral premium surfaces.

- [ ] **Step 1: Write failing contrast tests**

Add tests for the known black/white ratio and a failing low-contrast pair:

~~~ts
import { describe, expect, it } from 'vitest';
import { contrastRatio, meetsContrast } from '../src/contrast';

describe('contrast tools', () => {
  it('calculates the black and white contrast ratio', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('rejects a low-contrast normal-text pair at AA', () => {
    expect(meetsContrast('#777777', '#ffffff', 'AA')).toBe(false);
  });
});
~~~

- [ ] **Step 2: Run the focused test and verify the failure**

Run:

~~~powershell
pnpm --filter @naira/design-tokens exec vitest run test/contrast.test.ts
~~~

Expected: FAIL because \`contrastRatio\` and \`meetsContrast\` do not exist.

- [ ] **Step 3: Implement the small sRGB contrast module**

Implement hex parsing, sRGB linearization, relative luminance, and the WCAG
ratio formula. Reject malformed six-digit hex values with an intention-revealing
error. Keep the module independent from browser APIs and export the two
functions from \`src/index.ts\`.

- [ ] **Step 4: Run the focused test and verify the pass**

Run the same Vitest command. Expected: PASS with both assertions green.

- [ ] **Step 5: Record the palette research**

Create \`color-research.md\` with three named candidate directions:

1. Canopy: deep forest, moss, clay, sand, and warm cream.
2. Ridge: pine, lichen, terracotta, stone, and mist.
3. Trailhead: evergreen, fern, amber, earth, and cloud.

For each direction, record the full ramp, intended brand roles, semantic
roles, light/dark mappings, use on white and dark surfaces, and contrast results
from the new module. Use the Gojek, Grab, Airbnb, Komoot, Spectrum, Primer,
and WCAG references already listed in the design spec as research inputs. Do
not reuse their brand values or assets.

- [ ] **Step 6: Select and document the working palette**

Select the candidate that passes all required text and non-text contrast pairs
for the two pilot surfaces. Write \`002-color-system.md\` using the repository
ADR template with status \`Accepted\`, and record the reason the selected
direction remains distinct from mobility and travel references.

- [ ] **Step 7: Commit the color foundation decision**

~~~powershell
git add docs/design-system docs/decisions/002-color-system.md packages/design-tokens
git commit -m "docs(ui): Define Naira color system"
~~~

### Task 2: Extend the token schema for themes, density, and semantic roles

**Files:**
- Modify: \`packages/design-tokens/tokens.json\`
- Modify: \`packages/design-tokens/scripts/token-engine.mjs\`
- Modify: \`packages/design-tokens/scripts/token-engine.d.mts\`
- Modify: \`packages/design-tokens/scripts/build.mjs\`
- Modify: \`packages/design-tokens/src/index.ts\`
- Modify: \`packages/design-tokens/test/build.test.ts\`
- Create: \`packages/design-tokens/test/schema.test.ts\`

**Interfaces:**
- \`type DesignTheme = 'light' | 'dark'\`.
- \`type Density = 'comfortable' | 'compact'\`.
- \`resolveTokens(source: unknown): Record<string, string | number>\` remains
  available for primitive and non-themed tokens.
- \`resolveThemeTokens(source: unknown, theme: DesignTheme): Record<string, string | number>\` resolves one theme's semantic aliases.
- \`toCss(resolved: Record<string, string | number>, themes: Record<DesignTheme, Record<string, string | number>>): string\` emits root and theme override blocks.
- \`toDart(resolved: Record<string, string | number>, themes: Record<DesignTheme, Record<string, string | number>>): string\` emits deterministic cross-platform constants.

- [ ] **Step 1: Write schema tests before changing the generator**

Add tests that require the following token groups and generated names:

~~~ts
expect(source.color.primitive).toHaveProperty('forest-900');
expect(source.color.semantic).toHaveProperty('surface-canvas');
expect(source.color.theme.light).toHaveProperty('surface-canvas');
expect(source.color.theme.dark).toHaveProperty('surface-canvas');
expect(source.density).toHaveProperty('comfortable');
expect(source.density).toHaveProperty('compact');
expect(css).toContain("[data-theme='dark']");
expect(css).toContain('--naira-color-surface-canvas');
~~~

- [ ] **Step 2: Run the token tests and verify the failure**

Run:

~~~powershell
pnpm --filter @naira/design-tokens test
~~~

Expected: FAIL because the current schema has no themes, density groups, or
the new semantic names.

- [ ] **Step 3: Replace the temporary palette and add the authored schema**

Organize \`tokens.json\` into these groups:

~~~json
{
  "color": {
    "primitive": {},
    "semantic": {},
    "theme": {
      "light": {},
      "dark": {}
    }
  },
  "density": {
    "comfortable": {},
    "compact": {}
  },
  "typography": {},
  "spacing": {},
  "radius": {},
  "elevation": {},
  "motion": {},
  "data-visualization": {}
}
~~~

Include surface, content, border, action, focus, status, route, terrain,
weather, and chart roles. Keep semantic names intention-revealing and do not
add gear or itinerary business fields.

- [ ] **Step 4: Implement theme-aware resolution and deterministic output**

Keep unknown-reference and circular-reference errors. Add theme resolution
without changing the meaning of existing primitive aliases. Emit:

~~~css
:root {
  --naira-color-surface-canvas: ...;
}

[data-theme='dark'] {
  --naira-color-surface-canvas: ...;
}
~~~

Emit comfortable and compact values as semantic custom properties with a
stable prefix. Do not emit duplicate variables with ambiguous ownership.

- [ ] **Step 5: Run tests and regenerate outputs**

~~~powershell
pnpm --filter @naira/design-tokens build
pnpm --filter @naira/design-tokens test
pnpm --filter @naira/design-tokens check
~~~

Expected: PASS, with generated CSS and Dart files changed only by the build
script.

- [ ] **Step 6: Commit the token schema**

~~~powershell
git add packages/design-tokens
git commit -m "feat(ui): Add themed design tokens"
~~~

### Task 3: Integrate Tailwind CSS with the token source

**Files:**
- Modify: \`package.json\`
- Modify: \`pnpm-lock.yaml\`
- Modify: \`packages/ui-svelte/package.json\`
- Modify: \`packages/ui-svelte/src/styles.css\`
- Modify: \`packages/ui-svelte/vite.config.ts\`
- Modify: \`packages/ui-svelte/.storybook/main.ts\`
- Modify: \`apps/site/astro.config.mjs\`
- Modify: \`apps/workspace/vite.config.ts\`
- Create: \`packages/ui-svelte/test/styles.test.ts\`

**Interfaces:**
- \`@tailwindcss/vite\` 4.3.3 is registered in every Vite build that compiles
  Naira UI styles.
- \`packages/ui-svelte/src/styles.css\` imports Tailwind and generated tokens.
- Semantic theme variables map to utility namespaces such as \`bg-*\`,
  \`text-*\`, \`border-*\`, \`font-*\`, and responsive breakpoint variants.
- Consumers import \`@naira/ui-svelte/styles.css\`; they do not define a second
  Tailwind theme.

- [ ] **Step 1: Add the pinned Tailwind dependencies**

Run:

~~~powershell
pnpm add --save-dev tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
pnpm add @fontsource-variable/plus-jakarta-sans@5.3.0 --filter @naira/ui-svelte
~~~

Verify Tailwind versions appear in the root \`package.json\`, the font version
appears in \`packages/ui-svelte/package.json\`, and all three are in the lockfile.

- [ ] **Step 2: Write the CSS integration test**

Add a test that reads \`src/styles.css\` and verifies the required integration
markers:

~~~ts
expect(styles).toContain('@import "tailwindcss"');
expect(styles).toContain('@import "@naira/design-tokens/tokens.css"');
expect(styles).toContain('--font-sans');
expect(styles).toContain('--color-surface-canvas');
~~~

- [ ] **Step 3: Add Tailwind imports and theme variables**

Use this structure, keeping the design-token package as the value source:

~~~css
@import "tailwindcss";
@import "@naira/design-tokens/tokens.css";
@import "@fontsource-variable/plus-jakarta-sans";

@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));

@theme {
  --font-sans: var(--naira-typography-font-family-sans);
  --color-surface-canvas: var(--naira-color-surface-canvas);
  --color-content-primary: var(--naira-color-content-primary);
  --color-action-primary: var(--naira-color-action-primary);
  --color-status-danger: var(--naira-color-status-danger);
}
~~~

Add \`@source\` entries for the component, story, site, and workspace source
trees when the consumer build needs them. Keep the list explicit so generated
CSS does not scan unrelated packages.

- [ ] **Step 4: Register the Vite plugin in all consumers**

Add \`tailwindcss()\` from \`@tailwindcss/vite\` to the existing Vite plugin lists
in \`packages/ui-svelte/vite.config.ts\` and \`apps/workspace/vite.config.ts\`.
Add it under the \`vite.plugins\` configuration in
\`apps/site/astro.config.mjs\`. Use Storybook's \`viteFinal\` hook in
\`.storybook/main.ts\` to add the same plugin to the workbench build.

- [ ] **Step 5: Run focused style and application builds**

~~~powershell
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
pnpm --filter site check
pnpm --filter site build
pnpm --filter workspace check
pnpm --filter workspace build
~~~

Expected: PASS, with Tailwind utility classes generated for a token-backed
sample component and no unresolved CSS imports.

- [ ] **Step 6: Commit Tailwind integration**

~~~powershell
git add package.json pnpm-lock.yaml packages/ui-svelte apps/site apps/workspace
git commit -m "feat(ui): Integrate Tailwind with tokens"
~~~

### Task 4: Add typography, layout, motion, and density foundations

**Files:**
- Modify: \`packages/design-tokens/tokens.json\`
- Modify: \`packages/ui-svelte/src/styles.css\`
- Create: \`packages/ui-svelte/src/lib/VisuallyHidden.svelte\`
- Create: \`packages/ui-svelte/src/lib/Surface.svelte\`
- Create: \`packages/ui-svelte/src/lib/Stack.svelte\`
- Create: \`packages/ui-svelte/src/lib/Inline.svelte\`
- Create: \`packages/ui-svelte/src/lib/Divider.svelte\`
- Create: \`packages/ui-svelte/src/lib/types.ts\`
- Create: \`packages/ui-svelte/test/layout-foundations.test.ts\`

**Interfaces:**
- \`Stack\` accepts \`gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'\` and a
  \`density\` prop where relevant.
- \`Inline\` accepts the same gap scale plus \`wrap: boolean\`.
- \`Surface\` accepts \`tone: 'canvas' | 'subtle' | 'elevated'\`, a density,
  and optional \`ariaLabel\`.
- \`VisuallyHidden\` renders content available to assistive technology without
  visual layout impact.
- Motion tokens include duration, easing, and reduced-motion behavior.

- [ ] **Step 1: Record the font license and write failing layout behavior tests**

Record the SIL Open Font License reference in the design-system docs and
ensure the package added in Task 3 is loaded through the shared styles
entrypoint. Test semantic rendering and token-backed density classes:

~~~ts
it('renders a labelled surface with the requested tone', () => {
  render(Surface, { props: { tone: 'elevated', ariaLabel: 'Trip summary' } });
  expect(screen.getByRole('region', { name: 'Trip summary' })).toBeVisible();
});

it('keeps visually hidden content available to assistive technology', () => {
  render(VisuallyHidden, { slots: { default: 'Skip navigation' } });
  expect(screen.getByText('Skip navigation')).toBeInTheDocument();
});
~~~

- [ ] **Step 2: Implement the foundation components**

Use semantic HTML and Tailwind utility classes backed by semantic tokens. Do
not add generic \`Box\` or \`Layout\` components that have no current consumer.
Keep the components small and use slots for content composition.

- [ ] **Step 3: Add typography and motion utilities**

Add semantic classes or documented utilities for body, supporting text, labels,
headings, hero text, tabular figures, focus, reduced motion, and transitions.
Define the default \`comfortable\` values and explicit \`compact\` overrides in
the token source.

- [ ] **Step 4: Run focused checks**

~~~powershell
pnpm --filter @naira/design-tokens build
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
~~~

Expected: PASS with responsive layout stories and no raw color literals in the
new Svelte components.

- [ ] **Step 5: Commit the foundation components**

~~~powershell
git add package.json pnpm-lock.yaml packages/design-tokens packages/ui-svelte
git commit -m "feat(ui): Add layout and typography foundations"
~~~

### Task 5: Add the Naira icon contract

**Files:**
- Modify: \`package.json\`
- Modify: \`pnpm-lock.yaml\`
- Create: \`docs/design-system/iconography.md\`
- Create: \`packages/ui-svelte/src/lib/Icon.svelte\`
- Create: \`packages/ui-svelte/src/lib/IconButton.svelte\`
- Create: \`packages/ui-svelte/test/icon.test.ts\`
- Modify: \`packages/ui-svelte/src/index.ts\`

**Interfaces:**
- \`Icon\` accepts a typed icon name, \`size: 'sm' | 'md' | 'lg'\`,
  \`label?: string\`, and \`decorative?: boolean\`.
- \`IconButton\` requires an accessible \`label\`, accepts \`variant\`, \`size\`,
  and disabled/loading state, and delegates SVG rendering to \`Icon\`.
- The base set is \`lucide-svelte@1.0.1\` behind the Naira API.

- [ ] **Step 1: Add the pinned icon dependency**

Run:

~~~powershell
pnpm add lucide-svelte@1.0.1 --filter @naira/ui-svelte
~~~

Record the ISC license and the wrapper rule in \`iconography.md\`.

- [ ] **Step 2: Write failing icon accessibility tests**

~~~ts
it('hides decorative icons from assistive technology', () => {
  render(Icon, { props: { name: 'Compass', decorative: true } });
  expect(screen.getByTestId('naira-icon')).toHaveAttribute('aria-hidden', 'true');
});

it('requires an accessible name for an icon button', () => {
  render(IconButton, { props: { label: 'Open menu', name: 'Menu' } });
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeVisible();
});
~~~

- [ ] **Step 3: Implement the wrapper and icon naming map**

Use a closed union or generated map of supported names. Do not accept arbitrary
component constructors from consumers. Keep future Naira domain icons behind
the same API.

- [ ] **Step 4: Run checks and commit**

~~~powershell
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
git add package.json pnpm-lock.yaml docs/design-system packages/ui-svelte
git commit -m "feat(ui): Add Naira icon contract"
~~~

### Task 6: Add foundation verification and handoff artifacts

**Files:**
- Create: \`docs/design-system/foundations.md\`
- Create: \`docs/design-system/responsive.md\`
- Create: \`docs/design-system/accessibility.md\`
- Create: \`packages/design-tokens/test/generated-output.test.ts\`
- Modify: \`Taskfile.yml\`

**Interfaces:**
- \`task ui:tokens:check\` builds, tests, and typechecks design tokens.
- \`task ui:styles:check\` builds the token-backed Tailwind CSS consumer.
- Documentation names the source package and all generated outputs.

- [ ] **Step 1: Write generated-output tests**

Verify generated CSS and Dart outputs contain the selected font, theme,
density, status, route, and data-visualization tokens, and that a second build
does not produce a diff.

- [ ] **Step 2: Add Taskfile commands**

~~~yaml
  ui:tokens:check:
    cmds:
      - pnpm --filter @naira/design-tokens build
      - pnpm --filter @naira/design-tokens test
      - pnpm --filter @naira/design-tokens check

  ui:styles:check:
    cmds:
      - pnpm --filter @naira/ui-svelte check
      - pnpm --filter @naira/ui-svelte test
~~~

- [ ] **Step 3: Run the foundation checkpoint**

~~~powershell
task ui:tokens:check
task ui:styles:check
task format
git diff --check
~~~

Expected: PASS with deterministic generated files and no formatting errors.

- [ ] **Step 4: Commit the foundation handoff**

~~~powershell
git add Taskfile.yml docs/design-system packages/design-tokens packages/ui-svelte
git commit -m "docs(ui): Document design system foundations"
~~~
