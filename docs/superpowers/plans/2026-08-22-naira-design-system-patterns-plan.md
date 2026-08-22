# Naira Patterns and Pilot Surfaces Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Compose the core components into reusable responsive patterns and the
two approved pilot surfaces: public discovery and planner workspace.

**Architecture:** Generic patterns live in packages/ui-svelte and accept data,
slots, and callbacks without knowing Naira APIs. Astro and SvelteKit own
composition. Static pilot fixtures validate the design system without
pretending that product business flows or persistence already exist.

**Tech Stack:** Astro 7.2.4, SvelteKit 2.70.3, Svelte 5.56.9, TypeScript,
Tailwind CSS 4.3.3, @naira/design-tokens, @naira/ui-svelte, Vitest,
Testing Library, and Playwright.

**Spec:** [docs/superpowers/specs/2026-08-22-naira-design-system-design.md](../specs/2026-08-22-naira-design-system-design.md)

## Global Constraints

- The two pilots are public landing/discovery and planner workspace.
- Mobile is the baseline; desktop may change composition rather than only size.
- Public web uses comfortable density; planner data views may opt into compact.
- Domain recipes remain in applications until they prove cross-surface reuse.
- No pilot component calls an API, writes persistence, or implements auth.
- Use semantic HTML, WCAG 2.2 AA, visible focus, and redundant status signals.
- Use fixture data with explicit types and Indonesian-first content.
- Keep product state, server state, session state, and offline state separate.
- Do not duplicate the design system for public, workspace, or admin.
- Use failing behavior tests before new pattern behavior.
- Every pattern has responsive, empty, loading, error, and offline treatment where
  that state is applicable.
- Use commitlint-compatible messages such as feat(ui): Add planner pilot patterns.

---

### Task 1: Refactor the shared application shells around adaptive layout contracts

**Files:**
- Modify: apps/site/src/layouts/SiteLayout.astro
- Modify: apps/site/src/pages/index.astro
- Modify: apps/site/src/styles/global.css
- Modify: apps/workspace/src/lib/shell/AppShell.svelte
- Modify: apps/workspace/src/lib/shell/AdminShell.svelte
- Modify: apps/workspace/src/routes/(app)/+layout.svelte
- Modify: apps/workspace/src/routes/(admin)/+layout.svelte
- Modify: apps/workspace/test/shell.test.ts
- Modify: tests/e2e/web-shells.spec.ts

**Interfaces:**
- SiteLayout provides skip link, semantic header/main/footer, theme hook,
  responsive container, and public navigation slot.
- AppShell provides mobile navigation, desktop navigation, page header slot,
  content slot, offline status region, and density context.
- AdminShell provides the same structural contract with admin navigation and
  compact default for data-heavy regions.
- Shells do not inspect Principal roles or call API services.

- [ ] Step 1: Add failing shell behavior tests for skip navigation, mobile
  navigation label, desktop navigation landmark, and an offline status region.

- [ ] Step 2: Run pnpm --filter site test, pnpm --filter workspace test, and
  pnpm exec playwright test tests/e2e/web-shells.spec.ts. Expected: FAIL for
  the new accessible landmarks or responsive hooks.

- [ ] Step 3: Implement the shell contracts with shared UI components and
  semantic layout utilities. Use CSS media queries and data attributes for
  composition changes; do not duplicate app and admin components.

- [ ] Step 4: Verify at mobile and desktop viewport projects. Expected: the
  public shell, app shell, and admin shell expose stable landmarks and visible
  focus.

- [ ] Step 5: Commit with:

~~~powershell
git add apps/site apps/workspace tests/e2e/web-shells.spec.ts
git commit -m "refactor(ui): Align shells with responsive contracts"
~~~

### Task 2: Build the public discovery pilot

**Files:**
- Modify: apps/site/src/pages/index.astro
- Modify: apps/site/src/layouts/SiteLayout.astro
- Modify: apps/site/src/components/WelcomeMenu.svelte
- Modify: apps/site/src/styles/global.css
- Create: apps/site/src/components/DiscoveryCard.astro
- Create: apps/site/src/components/FeatureGrid.astro
- Create: apps/site/src/components/TrustSignal.astro
- Modify: apps/site/test/site-build.test.mjs
- Create: apps/site/test/public-pilot.test.mjs
- Modify: tests/e2e/web-shells.spec.ts

**Interfaces:**
- DiscoveryCard accepts title, description, image/visual treatment, and href.
- FeatureGrid accepts typed feature items and changes from multi-column desktop
  to a readable stacked mobile layout.
- TrustSignal accepts label, supporting text, and optional icon.
- The page consumes no API and uses static content only.

- [ ] Step 1: Write failing public pilot assertions.

~~~js
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = await readFile('src/pages/index.astro', 'utf8');

test('exposes a clear outdoor planning value proposition', () => {
  assert.match(source, /rencana pendakian/i);
});

test('keeps discovery actions keyboard reachable', () => {
  assert.match(source, /href=/);
});
~~~

- [ ] Step 2: Run pnpm --filter site test and pnpm --filter site check.
  Expected: FAIL because the pilot content and components do not exist.

- [ ] Step 3: Implement the public pilot with Plus Jakarta Sans, selected
  palette roles, comfortable density, expressive imagery treatment, and
  accessible headings. Keep the primary CTA clear without introducing account,
  booking, or planner business flow.

- [ ] Step 4: Add responsive tests for stacked mobile cards, readable hero
  text, focus-visible navigation, and no horizontal overflow.

- [ ] Step 5: Run pnpm --filter site check, pnpm --filter site build, and
  pnpm --filter site test. Expected: PASS.

- [ ] Step 6: Commit with:

~~~powershell
git add apps/site
git commit -m "feat(ui): Add public discovery pilot"
~~~

### Task 3: Build the planner workspace pilot

**Files:**
- Create: apps/workspace/src/lib/fixtures/planner-pilot.ts
- Create: apps/workspace/src/lib/recipes/TripSummaryRecipe.svelte
- Create: apps/workspace/src/lib/recipes/GearChecklistRecipe.svelte
- Create: apps/workspace/src/lib/recipes/ItineraryRecipe.svelte
- Modify: apps/workspace/src/routes/(app)/app/+page.svelte
- Modify: apps/workspace/src/routes/(admin)/admin/+page.svelte
- Modify: apps/workspace/test/shell.test.ts
- Create: apps/workspace/test/planner-pilot.test.ts

**Interfaces:**
- Planner fixture types are local, readonly, and API-independent.
- TripSummaryRecipe accepts title, destination, date range, member count, and
  sync status.
- GearChecklistRecipe accepts grouped checklist items with checked state and
  progress.
- ItineraryRecipe accepts ordered itinerary items with time, title, location,
  and status.
- Recipes render state and presentation only; they do not mutate fixture data.

- [ ] Step 1: Write failing planner pilot tests.

~~~ts
import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import { pilotChecklist, pilotTrip } from '../src/lib/fixtures/planner-pilot';

it('shows the trip summary and sync state', () => {
  render(TripSummaryRecipe, { props: { trip: pilotTrip } });
  expect(screen.getByRole('heading', { name: pilotTrip.title })).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent(/synced|offline|sync/i);
});

it('shows checklist progress without owning persistence', () => {
  render(GearChecklistRecipe, { props: { checklist: pilotChecklist } });
  expect(screen.getByRole('progressbar')).toBeVisible();
  expect(screen.getByRole('checkbox', { name: /water/i })).toBeVisible();
});
~~~

- [ ] Step 2: Run pnpm --filter workspace exec vitest run
  test/planner-pilot.test.ts. Expected: FAIL because the recipes do not exist.

- [ ] Step 3: Add typed static fixtures covering synced, dirty, offline, and
  conflict examples. Keep fixture state immutable and make all displayed
  Indonesian copy explicit.

- [ ] Step 4: Implement the recipes using core components, comfortable default
  density, compact data regions, and mobile-first composition. On mobile,
  stack summary, checklist, and itinerary; on desktop, use a supporting-pane
  or list-detail composition.

- [ ] Step 5: Add empty, loading, error, offline, and conflict stories for
  each applicable recipe. Keep retry/resolve actions as callbacks supplied by
  the route, with no persistence implementation.

- [ ] Step 6: Run pnpm --filter workspace check, pnpm --filter workspace test,
  and pnpm --filter workspace build. Expected: PASS.

- [ ] Step 7: Commit with:

~~~powershell
git add apps/workspace
git commit -m "feat(ui): Add planner workspace pilot"
~~~

### Task 4: Add generic reusable patterns to the UI package

**Files:**
- Create: packages/ui-svelte/src/lib/patterns/PageHeader.svelte
- Create: packages/ui-svelte/src/lib/patterns/FormLayout.svelte
- Create: packages/ui-svelte/src/lib/patterns/SearchFilterPanel.svelte
- Create: packages/ui-svelte/src/lib/patterns/ListDetail.svelte
- Create: packages/ui-svelte/src/lib/patterns/ResponsiveActionBar.svelte
- Create: packages/ui-svelte/src/lib/patterns/AsyncBoundary.svelte
- Create: packages/ui-svelte/test/patterns.test.ts
- Modify: packages/ui-svelte/src/index.ts

**Interfaces:**
- PageHeader accepts title, description, breadcrumbs, and action slot.
- FormLayout accepts sections, density, and action placement.
- SearchFilterPanel accepts query, filters, results summary, and clear action.
- ListDetail accepts list slot, detail slot, selected ID, and mobile mode.
- ResponsiveActionBar accepts primary, secondary, and destructive action slots.
- AsyncBoundary accepts the shared status union and state slots.
- Patterns never import app fixtures or API contracts.

- [ ] Step 1: Write failing pattern tests for list-detail composition,
  mobile action placement, form error summary, and async conflict treatment.

~~~ts
it('renders the detail pane with the selected item', () => {
  render(ListDetail, { props: { selectedId: 'trip-1', mobileMode: 'stacked' } });
  expect(screen.getByTestId('list-detail-detail')).toBeVisible();
});

it('keeps the primary mobile action reachable', () => {
  render(ResponsiveActionBar, { props: { primaryLabel: 'Simpan' } });
  expect(screen.getByRole('button', { name: 'Simpan' })).toBeVisible();
});
~~~

- [ ] Step 2: Run the focused pattern test and verify it fails.

- [ ] Step 3: Implement generic patterns with slots and typed props. Avoid
  feature names such as gear or itinerary in the generic package.

- [ ] Step 4: Add responsive stories for mobile, medium, and expanded layouts,
  including empty, error, loading, offline, and conflict cases.

- [ ] Step 5: Run pnpm --filter @naira/ui-svelte test,
  pnpm --filter @naira/ui-svelte check, and task ui:workbench:build.

- [ ] Step 6: Commit with:

~~~powershell
git add packages/ui-svelte
git commit -m "feat(ui): Add reusable responsive patterns"
~~~

### Task 5: Add admin shell specimens without business behavior

**Files:**
- Modify: apps/workspace/src/routes/(admin)/admin/+page.svelte
- Create: apps/workspace/src/lib/fixtures/admin-pilot.ts
- Create: apps/workspace/test/admin-pilot.test.ts
- Modify: apps/workspace/src/lib/shell/AdminShell.svelte

**Interfaces:**
- Admin fixture data represents a table, filter summary, empty state, and
  operational status without using real backend data.
- AdminShell supports compact data regions while preserving mobile usability.
- The admin page demonstrates table-to-list responsive transformation.

- [ ] Step 1: Write failing tests for admin heading, filter summary, empty/error
  state, and compact table content.

- [ ] Step 2: Run pnpm --filter workspace exec vitest run
  test/admin-pilot.test.ts. Expected: FAIL because the specimen does not exist.

- [ ] Step 3: Implement the static admin specimen using Table, FilterBar,
  EmptyState, Alert, and AsyncBoundary. Keep role checks and API calls out.

- [ ] Step 4: Add a Playwright viewport assertion that the mobile admin page
  does not require horizontal scrolling for its primary actions.

- [ ] Step 5: Run workspace check/test/build and browser smoke tests.

- [ ] Step 6: Commit with:

~~~powershell
git add apps/workspace
git commit -m "feat(ui): Add admin shell specimen"
~~~

### Task 6: Verify the pattern and pilot subsystem

**Files:**
- Test: apps/site
- Test: apps/workspace
- Test: packages/ui-svelte
- Test: tests/e2e/web-shells.spec.ts
- Modify: playwright.config.ts if viewport projects are missing

- [ ] Step 1: Run focused package checks.

~~~powershell
pnpm --filter @naira/ui-svelte check
pnpm --filter @naira/ui-svelte test
pnpm --filter site check
pnpm --filter site build
pnpm --filter site test
pnpm --filter workspace check
pnpm --filter workspace test
pnpm --filter workspace build
~~~

- [ ] Step 2: Run the workbench build.

~~~powershell
task ui:workbench:build
~~~

- [ ] Step 3: Run public, workspace, and admin browser checks at mobile and
  desktop projects.

~~~powershell
task web:test:e2e
~~~

Expected: PASS with no horizontal overflow on primary pilot interactions,
visible focus, correct shell landmarks, and stable public/workspace/admin
rendering.

- [ ] Step 4: Run task format and git diff --check.

- [ ] Step 5: Commit any test-only changes with a scoped commit and verify
  git status --short --branch is clean.
