# Naira Core Components and Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Convert the current Svelte primitives into a typed, opinionated,
state-driven Naira component library with a complete Storybook workbench.

**Architecture:** packages/ui-svelte owns reusable component behavior and
presentation. Components use semantic tokens and Tailwind utilities, expose
small explicit props, and keep business state outside the package. Existing
simple components keep the readable Svelte export-let style; this plan does not
perform a speculative repository-wide migration to runes.

**Tech Stack:** Svelte 5.56.9, TypeScript 6.0.3, Tailwind CSS 4.3.3,
@testing-library/svelte, @testing-library/jest-dom, Vitest, Storybook 10.5.10,
and the foundation outputs from the foundations plan.

**Spec:** [docs/superpowers/specs/2026-08-22-naira-design-system-design.md](../specs/2026-08-22-naira-design-system-design.md)

## Global Constraints

- Components are opinionated Naira components, not a second headless API.
- Component props express appearance and interaction contract, not business rules.
- Use semantic HTML, visible focus, accessible names, and explicit applicable states.
- Do not use raw color or spacing literals in component styles.
- Do not use boolean props to combine unrelated behaviors.
- Keep component files focused and under the repository's 100-column formatter.
- Preserve the package boundary: no API call, persistence, session provider, or
  synchronization implementation belongs here.
- Use failing behavior tests before component behavior code.
- Storybook stories show default, responsive, and state-matrix cases.
- Indonesian-first copy belongs in consumer examples or content configuration,
  not hidden inside generic components.
- Every component added here must be exported from packages/ui-svelte/src/index.ts.
- Use commitlint-compatible messages such as feat(ui): Add form controls.

---

### Task 1: Establish component API conventions and internal helpers

**Files:**
- Modify: packages/ui-svelte/src/lib/types.ts
- Create: packages/ui-svelte/src/lib/internal/classNames.ts
- Create: packages/ui-svelte/test/component-api.test.ts
- Modify: packages/ui-svelte/src/index.ts

**Interfaces:**
- type Density = 'comfortable' | 'compact'.
- type ControlSize = 'sm' | 'md' | 'lg'.
- type ComponentTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'.
- cx(...values: Array<string | false | null | undefined>): string joins
  conditional class names without adding a dependency.
- Simple components use typed export-let props and slots. Stateful components
  may use Svelte 5 runes only when local state requires them.

- [ ] Step 1: Write the failing helper test.

~~~ts
import { expect, it } from 'vitest';
import { cx } from '../src/lib/internal/classNames';

it('joins only present class names', () => {
  expect(cx('base', false, undefined, 'state')).toBe('base state');
});
~~~

- [ ] Step 2: Run pnpm --filter @naira/ui-svelte exec vitest run test/component-api.test.ts and verify it fails because the helper does not exist.

- [ ] Step 3: Keep the shared unions from the foundations phase and implement
  the helper. Keep cx local and explicit. Do not introduce a class-variance
  framework.

- [ ] Step 4: Run pnpm --filter @naira/ui-svelte test and
  pnpm --filter @naira/ui-svelte check. Expected: PASS.

- [ ] Step 5: Commit with:

~~~powershell
git add packages/ui-svelte
git commit -m "refactor(ui): Define component API conventions"
~~~

### Task 2: Migrate the existing primitives to the semantic contract

**Files:**
- Modify: packages/ui-svelte/src/lib/Button.svelte
- Modify: packages/ui-svelte/src/lib/TextInput.svelte
- Modify: packages/ui-svelte/src/lib/Card.svelte
- Modify: packages/ui-svelte/src/lib/Badge.svelte
- Modify: packages/ui-svelte/src/lib/EmptyState.svelte
- Modify: packages/ui-svelte/src/lib/ErrorState.svelte
- Modify: packages/ui-svelte/src/lib/OfflineBanner.svelte
- Modify: packages/ui-svelte/src/lib/SyncStatus.svelte
- Modify: packages/ui-svelte/test/Button.test.ts
- Modify: packages/ui-svelte/test/state-components.test.ts
- Modify: existing stories for the migrated components

**Interfaces:**
- Button: label, variant, size, density, loading, disabled, type, and optional ariaLabel.
- TextInput: id, label, value, description, error, required, disabled, and readonly.
- Card: ariaLabel, tone, and density.
- Badge: label, tone, size, and optional icon.
- EmptyState: title, description, and action slot.
- ErrorState: title, message, and retry/action slot.
- OfflineBanner: online, optional message, and status role.
- SyncStatus: idle, dirty, saving, queued, syncing, synced, offline,
  retryable-failure, blocked, or conflict.

- [ ] Step 1: Add failing user-visible tests.

~~~ts
it('marks a loading button busy and unavailable', () => {
  render(Button, { props: { label: 'Save', loading: true } });
  expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('aria-busy', 'true');
});

it('links input description and error to the control', () => {
  render(TextInput, {
    props: { label: 'Name', description: 'Use your trail name', error: 'Name is required' },
  });
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
    'Use your trail name Name is required',
  );
});

it('shows a retryable sync state', () => {
  render(SyncStatus, { props: { status: 'retryable-failure' } });
  expect(screen.getByRole('status')).toHaveTextContent(/retry/i);
});
~~~

- [ ] Step 2: Run pnpm --filter @naira/ui-svelte exec vitest run
  test/Button.test.ts test/state-components.test.ts. Expected: FAIL for the
  new props and states.

- [ ] Step 3: Migrate styles and semantics. Replace raw values with semantic
  Tailwind classes and token-backed utilities. Preserve current exports while
  adding variants. Ensure focus, disabled, status, and error associations.

- [ ] Step 4: Run pnpm --filter @naira/ui-svelte test and check. Expected: PASS.

- [ ] Step 5: Commit with:

~~~powershell
git add packages/ui-svelte
git commit -m "refactor(ui): Align primitives with state contracts"
~~~

### Task 3: Add text, link, and control primitives

**Files:**
- Create: packages/ui-svelte/src/lib/Text.svelte
- Create: packages/ui-svelte/src/lib/Heading.svelte
- Create: packages/ui-svelte/src/lib/Link.svelte
- Create: packages/ui-svelte/src/lib/Field.svelte
- Create: packages/ui-svelte/src/lib/Textarea.svelte
- Create: packages/ui-svelte/src/lib/NumberInput.svelte
- Create: packages/ui-svelte/src/lib/Checkbox.svelte
- Create: packages/ui-svelte/src/lib/Radio.svelte
- Create: packages/ui-svelte/src/lib/Switch.svelte
- Create: packages/ui-svelte/test/control-components.test.ts
- Modify: packages/ui-svelte/src/index.ts

**Interfaces:**
- Text accepts semantic tone, size, and an allowed HTML element.
- Heading accepts level 1-4 and responsive size.
- Link accepts href, external, and tone without hiding link semantics.
- Field owns label, description, error, required, and control ID linkage.
- Textarea and NumberInput reuse the Field contract.
- Checkbox, Radio, and Switch expose native semantics and a visible label.

- [ ] Step 1: Write failing interaction tests.

~~~ts
it('renders a checkbox with an accessible name', () => {
  render(Checkbox, { props: { label: 'Bring water', checked: false } });
  expect(screen.getByRole('checkbox', { name: 'Bring water' })).toBeVisible();
});

it('renders a required field with an associated error', () => {
  render(Field, { props: { id: 'route', label: 'Route', error: 'Choose a route' } });
  expect(screen.getByText('Choose a route')).toHaveAttribute('role', 'alert');
});
~~~

- [ ] Step 2: Run the focused test and verify it fails because the components do not exist.

- [ ] Step 3: Implement native input, textarea, and anchor semantics. Keep
  Field linkage explicit with aria-describedby, aria-invalid, aria-required,
  and stable IDs. Do not simulate native controls with divs.

- [ ] Step 4: Add comfortable and compact variants while preserving mobile touch
  targets and keyboard operation.

- [ ] Step 5: Run package tests and check, then commit:

~~~powershell
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
git add packages/ui-svelte
git commit -m "feat(ui): Add accessible control primitives"
~~~

### Task 4: Add feedback, loading, and async components

**Files:**
- Create: packages/ui-svelte/src/lib/Alert.svelte
- Create: packages/ui-svelte/src/lib/Banner.svelte
- Create: packages/ui-svelte/src/lib/Spinner.svelte
- Create: packages/ui-svelte/src/lib/Skeleton.svelte
- Create: packages/ui-svelte/src/lib/Progress.svelte
- Create: packages/ui-svelte/src/lib/Toast.svelte
- Create: packages/ui-svelte/src/lib/AsyncState.svelte
- Create: packages/ui-svelte/test/feedback-components.test.ts
- Modify: packages/ui-svelte/src/index.ts

**Interfaces:**
- Alert and Banner accept tone, title, message, and an optional action slot.
- Spinner accepts label and size.
- Skeleton accepts shape, width, and height from approved tokens.
- Progress accepts value, max, label, and indeterminate.
- Toast accepts tone, title, message, and dismiss action.
- AsyncState accepts the shared status union and slots for content, loading,
  empty, offline, retryable failure, blocked, and conflict states.

- [ ] Step 1: Write failing state and announcement tests.

~~~ts
it('announces an alert with its semantic role', () => {
  render(Alert, { props: { tone: 'danger', title: 'Cannot save', message: 'Try again' } });
  expect(screen.getByRole('alert')).toHaveTextContent('Cannot save');
});

it('exposes progress value and label', () => {
  render(Progress, { props: { value: 50, max: 100, label: 'Packing progress' } });
  expect(screen.getByRole('progressbar', { name: 'Packing progress' }))
    .toHaveAttribute('aria-valuenow', '50');
});

it('renders retry for a retryable failure', () => {
  render(AsyncState, { props: { status: 'retryable-failure' } });
  expect(screen.getByRole('button', { name: /retry/i })).toBeVisible();
});
~~~

- [ ] Step 2: Run the focused test and verify it fails because the components do not exist.

- [ ] Step 3: Implement semantic feedback behavior. Use role=status for
  non-urgent updates and role=alert for urgent errors. Respect reduced motion.
  Keep retry, resolve, discard, and continue-offline actions as slots or
  callbacks; do not implement persistence.

- [ ] Step 4: Run package tests and check, then commit:

~~~powershell
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
git add packages/ui-svelte
git commit -m "feat(ui): Add feedback and async states"
~~~

### Task 5: Add overlay, selection, and navigation components

**Files:**
- Create: packages/ui-svelte/src/lib/Select.svelte
- Create: packages/ui-svelte/src/lib/Combobox.svelte
- Create: packages/ui-svelte/src/lib/Popover.svelte
- Create: packages/ui-svelte/src/lib/Tooltip.svelte
- Create: packages/ui-svelte/src/lib/DropdownMenu.svelte
- Create: packages/ui-svelte/src/lib/Dialog.svelte
- Create: packages/ui-svelte/src/lib/Drawer.svelte
- Create: packages/ui-svelte/src/lib/Tabs.svelte
- Create: packages/ui-svelte/src/lib/Accordion.svelte
- Create: packages/ui-svelte/src/lib/Breadcrumb.svelte
- Create: packages/ui-svelte/src/lib/Pagination.svelte
- Create: packages/ui-svelte/src/lib/Stepper.svelte
- Create: packages/ui-svelte/test/overlay-navigation.test.ts
- Modify: packages/ui-svelte/src/index.ts

**Interfaces:**
- Select accepts labelled options, selected value, disabled options, and validation.
- Combobox accepts input value, options, loading, and empty state.
- Popover and Tooltip expose trigger/content composition without consumer
  positioning internals.
- Dialog and Drawer accept open, title, description, close, and focus-return.
- Tabs accepts typed tab IDs and exposes selected state.
- Pagination exposes current page, page count, and page-change event.
- Stepper exposes step status without owning navigation business rules.

- [ ] Step 1: Write failing keyboard and focus tests.

~~~ts
it('renders an open dialog with an accessible name', () => {
  render(Dialog, { props: { open: true, title: 'Confirm trip' } });
  expect(screen.getByRole('dialog', { name: 'Confirm trip' })).toBeVisible();
});

it('renders a labelled mobile drawer', () => {
  render(Drawer, { props: { open: true, title: 'Filters' } });
  expect(screen.getByRole('dialog', { name: 'Filters' })).toBeVisible();
});

it('exposes the selected tab', () => {
  render(Tabs, {
    props: { selected: 'overview', tabs: [{ id: 'overview', label: 'Overview' }] },
  });
  expect(screen.getByRole('tab', { name: 'Overview' }))
    .toHaveAttribute('aria-selected', 'true');
});
~~~

- [ ] Step 2: Run the focused test and verify it fails because the components do not exist.

- [ ] Step 3: Implement keyboard and responsive behavior. Use native disclosure
  elements where they provide correct behavior. Dialog and Drawer require focus
  containment, Escape close, focus return, and scroll locking in a focused
  internal module.

- [ ] Step 4: Add stories for open/closed, disabled, loading, empty, keyboard,
  mobile, desktop, and reduced-motion cases. Test layout behavior in browser
  tests when jsdom cannot verify it.

- [ ] Step 5: Run package tests and check, then commit:

~~~powershell
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
git add packages/ui-svelte
git commit -m "feat(ui): Add overlays and navigation"
~~~

### Task 6: Add data-display components

**Files:**
- Create: packages/ui-svelte/src/lib/Table.svelte
- Create: packages/ui-svelte/src/lib/List.svelte
- Create: packages/ui-svelte/src/lib/Timeline.svelte
- Create: packages/ui-svelte/src/lib/Metric.svelte
- Create: packages/ui-svelte/src/lib/SearchInput.svelte
- Create: packages/ui-svelte/src/lib/FilterBar.svelte
- Create: packages/ui-svelte/test/data-components.test.ts
- Modify: packages/ui-svelte/src/index.ts

**Interfaces:**
- Table accepts columns, rows, caption, empty state, loading state, and compact
  density; it does not implement sorting or persistence.
- List accepts labelled items and selected state.
- Timeline accepts ordered events with status and accessible labels.
- Metric accepts label, value, trend, and supporting text.
- SearchInput exposes query and clear action with a labelled input.
- FilterBar composes filter controls and exposes clear-all behavior.

- [ ] Step 1: Write failing data behavior tests.

~~~ts
it('renders a table caption and column headers', () => {
  render(Table, {
    props: {
      caption: 'Gear list',
      columns: [{ key: 'name', label: 'Name' }],
      rows: [{ name: 'Water' }],
    },
  });
  expect(screen.getByRole('table', { name: 'Gear list' })).toBeVisible();
  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeVisible();
});

it('renders a useful empty state for an empty list', () => {
  render(List, { props: { label: 'Trips', items: [] } });
  expect(screen.getByText(/no trips/i)).toBeVisible();
});
~~~

- [ ] Step 2: Run the focused test and verify it fails because the components do not exist.

- [ ] Step 3: Implement accessible data display. Use native table semantics.
  Provide a prioritized mobile list/card composition through documented
  responsive content rather than forcing horizontal overflow. Keep series
  colors, route markers, and statuses backed by data-visualization tokens and
  redundant text/icon treatment.

- [ ] Step 4: Run package tests and check, then commit:

~~~powershell
pnpm --filter @naira/ui-svelte test
pnpm --filter @naira/ui-svelte check
git add packages/ui-svelte
git commit -m "feat(ui): Add data display components"
~~~

### Task 7: Complete the Storybook state matrix

**Files:**
- Modify: packages/ui-svelte/.storybook/preview.ts
- Create: packages/ui-svelte/stories/Foundations.stories.ts
- Create: packages/ui-svelte/stories/Controls.stories.ts
- Create: packages/ui-svelte/stories/Feedback.stories.ts
- Create: packages/ui-svelte/stories/Overlays.stories.ts
- Create: packages/ui-svelte/stories/DataDisplay.stories.ts
- Modify: packages/ui-svelte/stories/Button.stories.ts
- Modify: packages/ui-svelte/stories/EmptyState.stories.ts
- Modify: packages/ui-svelte/stories/ErrorState.stories.ts
- Modify: packages/ui-svelte/stories/OfflineBanner.stories.ts
- Modify: packages/ui-svelte/stories/SyncStatus.stories.ts
- Modify: existing packages/ui-svelte/stories/*.stories.ts

**Interfaces:**
- Every story imports shared styles and uses the same token-backed theme.
- Every interactive component has default, compact, mobile, loading, disabled,
  focus, error, empty, and reduced-motion stories where applicable.
- Every async component has the shared lifecycle states.

- [ ] Step 1: Add shared Storybook decorators. Configure light theme,
  dark-ready data-theme, comfortable/compact density, mobile viewport, and an
  accessibility-friendly background in preview.ts.

- [ ] Step 2: Add TypeScript CSF stories for each component family, matching the
  repository's working Storybook configuration. Keep story data static and do
  not connect to API or application state.

- [ ] Step 3: Run task ui:workbench:build. Expected: PASS with no missing
  component exports or Storybook compilation errors.

- [ ] Step 4: Commit with:

~~~powershell
git add packages/ui-svelte/.storybook packages/ui-svelte/stories
git commit -m "test(ui): Complete component state stories"
~~~

### Task 8: Verify the core component subsystem

**Files:**
- Test: packages/ui-svelte
- Test: packages/design-tokens
- Test: packages/ui-svelte/.storybook

- [ ] Step 1: Run task ui:tokens:check, pnpm --filter @naira/ui-svelte check,
  and pnpm --filter @naira/ui-svelte test.

- [ ] Step 2: Run task ui:workbench:build.

- [ ] Step 3: Run task format and git diff --check. Expected: PASS with
  deterministic generated files and a clean diff after the scoped commits.
