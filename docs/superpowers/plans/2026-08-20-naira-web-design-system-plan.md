# Naira Web and Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build the Astro public site, SvelteKit application workspace, token-first design system, reusable Svelte primitives, and browser smoke coverage without implementing business flows.

**Architecture:** Astro owns public/discovery pages and hydrates explicit Svelte islands. SvelteKit owns one application workspace with separate app and admin route groups. Both consume design tokens and Svelte primitives from workspace packages.

**Tech Stack:** Astro, Svelte, SvelteKit, TypeScript, pnpm, CSS custom properties, Vitest, Testing Library, Storybook, and Playwright.

**Spec:** docs/superpowers/specs/2026-08-20-naira-foundation-design.md

## Global Constraints

- TypeScript.
- Astro.
- Svelte.
- PostgreSQL.
- Go.
- Flutter for the later mobile client.
- Redis.
- Public web and discovery experience.
- Authenticated planner workspace.
- Administrative web experience.
- Collaborative trips with an owner and members.
- Future mobile use without connectivity.
- Offline editing for itinerary, gear checklist, and logistics, followed by synchronization.
- Simple, auditable conflict handling in the first synchronization design.
- Code must be modular without overengineering, with readability as a primary review criterion.
- Commitlint must use the approved type, sentence-case subject, ui/api/empty scope, and no Co-authored-by trailer.
- Components and functions must avoid unnecessarily long lines; formatter print width is 100 where supported.
- The root AGENTS.md must reference .agents/architecture.md, .agents/conventions.md, .agents/structure.md, and .agents/testing.md.
- Dockerfiles must be multi-stage, non-root, reproducible, and free of baked-in secrets.
- Docker Compose must support local development and CI integration dependencies.
- Semantic versioning applies independently to contracts, shared packages, services, and applications.

---

### Task 1: Create the design-token package

**Files:**
- Create: packages/design-tokens/package.json
- Create: packages/design-tokens/tokens.json
- Create: packages/design-tokens/scripts/build.mjs
- Create: packages/design-tokens/src/generated/tokens.css
- Create: packages/design-tokens/src/generated/tokens.dart
- Create: packages/design-tokens/src/index.ts
- Create: packages/design-tokens/test/build.test.ts

**Interfaces:**
- Produces CSS custom properties for Astro and SvelteKit.
- Produces Dart constants for the future Flutter client.
- Consumes only tokens.json; generated outputs are never edited by hand.

- [ ] **Step 1: Define the package manifest**

Create package.json with name @naira/design-tokens, version 0.1.0, private true, type module, build script node scripts/build.mjs, test script vitest run test, and exports for the TypeScript entrypoint, CSS output, and Dart output.

- [ ] **Step 2: Define primitive and semantic tokens**

Create tokens.json with primitive color, typography, spacing, radius, elevation, and motion values. Add semantic aliases for surface, content, border, action, feedback, and focus. Include light and dark semantic surface values. Do not add trip, gear, or itinerary terms to this package.

Use this minimum source shape:

~~~json
{
  "color": {
    "primitive": {
      "neutral-0": "#ffffff",
      "neutral-950": "#111827",
      "brand-600": "#2563eb",
      "success-600": "#16a34a",
      "danger-600": "#dc2626"
    },
    "semantic": {
      "surface-default": "{color.primitive.neutral-0}",
      "content-default": "{color.primitive.neutral-950}",
      "action-primary": "{color.primitive.brand-600}",
      "feedback-success": "{color.primitive.success-600}",
      "feedback-danger": "{color.primitive.danger-600}"
    }
  },
  "spacing": {
    "1": "0.25rem",
    "2": "0.5rem",
    "4": "1rem",
    "6": "1.5rem",
    "8": "2rem"
  }
}
~~~

- [ ] **Step 3: Implement deterministic token generation**

scripts/build.mjs must read tokens.json, resolve references, write kebab-case CSS variables, write valid Dart constants, and exit non-zero for missing references or duplicate paths.

Generated CSS must contain:

~~~css
:root {
  --naira-color-surface-default: #ffffff;
  --naira-color-content-default: #111827;
  --naira-color-action-primary: #2563eb;
}
~~~

- [ ] **Step 4: Add generator tests**

test/build.test.ts must verify required semantic CSS variables and that an unresolved reference throws:

~~~ts
it('emits required semantic CSS variables', () => {
  expect(css).toContain('--naira-color-surface-default');
});

it('fails for an unresolved semantic reference', () => {
  expect(() => resolveTokens({ missing: '{unknown.token}' })).toThrow();
});
~~~

- [ ] **Step 5: Build, test, and commit**

~~~powershell
corepack pnpm --filter @naira/design-tokens build
corepack pnpm --filter @naira/design-tokens test
git add packages/design-tokens
git commit -m "feat(ui): Add design token foundation"
~~~

### Task 2: Create the Svelte primitive package

**Files:**
- Create: packages/ui-svelte/package.json
- Create: packages/ui-svelte/src/lib/Button.svelte
- Create: packages/ui-svelte/src/lib/TextInput.svelte
- Create: packages/ui-svelte/src/lib/Card.svelte
- Create: packages/ui-svelte/src/lib/Badge.svelte
- Create: packages/ui-svelte/src/lib/EmptyState.svelte
- Create: packages/ui-svelte/src/lib/ErrorState.svelte
- Create: packages/ui-svelte/src/lib/OfflineBanner.svelte
- Create: packages/ui-svelte/src/lib/SyncStatus.svelte
- Create: packages/ui-svelte/src/index.ts
- Create: packages/ui-svelte/src/styles.css
- Create: packages/ui-svelte/test/Button.test.ts
- Create: packages/ui-svelte/test/state-components.test.ts

**Interfaces:**
- Button exposes variant, disabled, loading, type, and accessible content.
- TextInput exposes label, value, error, disabled, and description linkage.
- OfflineBanner exposes online boolean.
- SyncStatus exposes idle, syncing, synced, and conflict states.
- No primitive imports a business module.

- [ ] **Step 1: Define package dependencies and exports**

Create package.json with version 0.1.0, Svelte as a peer dependency, @naira/design-tokens as a workspace dependency, and scripts check, test, and build. Export every primitive from src/index.ts.

- [ ] **Step 2: Add token styles**

Create src/styles.css that imports generated token CSS and defines only shared reset and focus rules. Do not add page layout rules.

- [ ] **Step 3: Write failing Button and state tests**

Use Testing Library and Vitest:

~~~ts
it('renders a named primary button', () => {
  render(Button, { props: { children: 'Save', variant: 'primary' } });
  expect(screen.getByRole('button', { name: 'Save' })).toBeVisible();
});

it('disables a loading button', () => {
  render(Button, { props: { children: 'Save', loading: true } });
  expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
});

it('exposes input errors accessibly', () => {
  render(TextInput, { props: { label: 'Name', error: 'Name is required' } });
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Name is required');
});
~~~

- [ ] **Step 4: Implement primitives**

Implement the listed primitives with semantic HTML, visible focus, keyboard behavior, token variables, explicit loading/error/offline states, and print width 100. Do not add API calls or domain rules.

- [ ] **Step 5: Verify and commit**

~~~powershell
corepack pnpm --filter @naira/ui-svelte test
corepack pnpm --filter @naira/ui-svelte check
git add packages/ui-svelte
git commit -m "feat(ui): Add reusable Svelte primitives"
~~~

### Task 3: Add the component workbench

**Files:**
- Create: packages/ui-svelte/.storybook/main.ts
- Create: packages/ui-svelte/.storybook/preview.ts
- Create: packages/ui-svelte/stories/Button.stories.svelte
- Create: packages/ui-svelte/stories/States.stories.svelte
- Modify: Taskfile.yml
- Modify: package.json

**Interfaces:**
- Produces an isolated visual catalog for every primitive state.
- Consumes @naira/ui-svelte and @naira/design-tokens.
- Never becomes a production runtime dependency.

- [ ] **Step 1: Install and configure Storybook**

Initialize Storybook for Svelte inside packages/ui-svelte, pin generated dependencies, import token CSS in preview.ts, and set a mobile default viewport with visible focus styling.

- [ ] **Step 2: Add stories**

Create Button stories for primary, secondary, disabled, loading, and long-label states. Create state stories for EmptyState, ErrorState, OfflineBanner, and every SyncStatus value.

- [ ] **Step 3: Add workbench tasks**

Add these commands to Taskfile.yml:

~~~yaml
  ui:workbench:
    cmds:
      - pnpm --dir packages/ui-svelte storybook dev --ci

  ui:workbench:build:
    cmds:
      - pnpm --dir packages/ui-svelte storybook build
~~~

Use the generated package scripts if the initializer uses different internal names.

- [ ] **Step 4: Verify and commit**

~~~powershell
task ui:workbench:build
git add Taskfile.yml package.json pnpm-lock.yaml packages/ui-svelte/.storybook packages/ui-svelte/stories
git commit -m "feat(ui): Add component workbench"
~~~

### Task 4: Create the Astro public site shell

**Files:**
- Create: apps/site/package.json
- Create: apps/site/astro.config.mjs
- Create: apps/site/tsconfig.json
- Create: apps/site/src/layouts/SiteLayout.astro
- Create: apps/site/src/pages/index.astro
- Create: apps/site/src/components/WelcomeMenu.svelte
- Create: apps/site/src/styles/global.css
- Create: apps/site/test/site-build.test.ts

**Interfaces:**
- Produces a buildable Astro site at apps/site.
- Consumes @naira/design-tokens and @naira/ui-svelte.
- Contains no authenticated planner or admin business state.

- [ ] **Step 1: Initialize Astro**

Create the Astro app with strict TypeScript and the Svelte integration. Pin generated dependencies and configure static output for the foundation public shell.

- [ ] **Step 2: Configure shared packages**

Extend @naira/tsconfig, import token CSS in global.css, and configure Svelte integration so only explicit client directives hydrate components.

- [ ] **Step 3: Build the public layout and home page**

SiteLayout.astro must render semantic html, metadata, skip link, header, main, and footer. index.astro must include a product heading, short description, primary CTA, and discovery navigation without business CRUD.

- [ ] **Step 4: Add one Svelte island**

WelcomeMenu.svelte must implement keyboard-accessible menu behavior and be hydrated through an explicit client directive.

- [ ] **Step 5: Verify and commit**

~~~powershell
corepack pnpm --filter site build
corepack pnpm --filter site test
git add apps/site
git commit -m "feat(ui): Add Astro public site shell"
~~~

### Task 5: Create the SvelteKit application workspace shell

**Files:**
- Create: apps/workspace/package.json
- Create: apps/workspace/svelte.config.js
- Create: apps/workspace/vite.config.ts
- Create: apps/workspace/tsconfig.json
- Create: apps/workspace/src/app.html
- Create: apps/workspace/src/routes/+layout.svelte
- Create: apps/workspace/src/routes/(app)/+layout.svelte
- Create: apps/workspace/src/routes/(app)/app/+page.svelte
- Create: apps/workspace/src/routes/(admin)/+layout.svelte
- Create: apps/workspace/src/routes/(admin)/admin/+page.svelte
- Create: apps/workspace/src/lib/shell/AppShell.svelte
- Create: apps/workspace/src/lib/shell/AdminShell.svelte
- Create: apps/workspace/src/lib/session/principal.ts
- Create: apps/workspace/test/shell.test.ts

**Interfaces:**
- Produces one SvelteKit application with app and admin route groups.
- AppShell and AdminShell consume shared tokens and primitives.
- principal.ts defines the session boundary without implementing an identity provider.
- Pages are foundation shells, not business-flow screens.

- [ ] **Step 1: Initialize SvelteKit**

Create the SvelteKit app with TypeScript and the Node adapter. Pin generated dependencies and extend @naira/tsconfig.

- [ ] **Step 2: Define the principal boundary**

Create src/lib/session/principal.ts:

~~~ts
export type PlatformRole = 'user' | 'admin' | 'operator';

export type Principal = {
  subject: string;
  roles: readonly PlatformRole[];
  displayName: string | null;
};

export const anonymousPrincipal: Principal = {
  subject: '',
  roles: [],
  displayName: null,
};
~~~

No provider-specific token parsing belongs in this file.

- [ ] **Step 3: Implement the two shells**

AppShell must render mobile-first navigation, content area, offline status region, and desktop navigation. AdminShell must render an admin-specific navigation and density while consuming the same primitives. Neither shell performs authorization.

- [ ] **Step 4: Add route-group pages**

The app route group renders AppShell and identifies the planner workspace shell. The admin route group renders AdminShell and identifies the administration shell. Both include empty/error regions without mutation behavior.

- [ ] **Step 5: Add source guard tests**

shell.test.ts must verify that app and admin shells remain distinct and that the workspace source does not write access tokens to browser storage:

~~~ts
it('keeps app and admin shells distinct', () => {
  expect(appShellText).not.toEqual(adminShellText);
});

it('does not write access tokens to browser storage', () => {
  expect(sourceFiles).not.toContain('localStorage.setItem');
});
~~~

- [ ] **Step 6: Verify and commit**

~~~powershell
corepack pnpm --filter workspace check
corepack pnpm --filter workspace test
corepack pnpm --filter workspace build
git add apps/workspace
git commit -m "feat(ui): Add SvelteKit workspace shells"
~~~

### Task 6: Add browser smoke coverage

**Files:**
- Create: tests/e2e/web-shells.spec.ts
- Create: playwright.config.ts
- Modify: package.json
- Modify: Taskfile.yml

**Interfaces:**
- Produces browser checks for the public site, app shell, and admin shell.
- Starts site and workspace through deterministic local commands.

- [ ] **Step 1: Install Playwright**

Run:

~~~powershell
corepack pnpm add --save-dev @playwright/test
corepack pnpm exec playwright install chromium
~~~

Pin the dependency and record browser installation in README.md.

- [ ] **Step 2: Configure servers**

playwright.config.ts must start the public site and workspace on deterministic ports, run headless in CI, and allow one-browser local execution.

- [ ] **Step 3: Write smoke tests**

Create tests/e2e/web-shells.spec.ts:

~~~ts
import { expect, test } from '@playwright/test';

test('public site renders its foundation shell', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /naira/i })).toBeVisible();
});

test('workspace exposes app and admin shells', async ({ page }) => {
  await page.goto('/app');
  await expect(page.getByText(/planner workspace/i)).toBeVisible();

  await page.goto('/admin');
  await expect(page.getByText(/administration shell/i)).toBeVisible();
});
~~~

- [ ] **Step 4: Add and run the task**

Add web:test:e2e to Taskfile.yml:

~~~yaml
  web:test:e2e:
    cmds:
      - pnpm exec playwright test
~~~

Run task web:test:e2e and expect all Chromium smoke tests to pass.

- [ ] **Step 5: Commit browser coverage**

~~~powershell
git add tests/e2e playwright.config.ts package.json pnpm-lock.yaml Taskfile.yml
git commit -m "test(ui): Add web shell smoke tests"
~~~

### Task 7: Verify the web/design-system subsystem

**Files:**
- Test: apps/site
- Test: apps/workspace
- Test: packages/design-tokens
- Test: packages/ui-svelte
- Test: tests/e2e

**Interfaces:**
- Consumes Tasks 1-6.
- Produces buildable web/design-system artifacts consumed by the infrastructure plan.

- [ ] **Step 1: Run package checks**

~~~powershell
corepack pnpm --filter @naira/design-tokens build
corepack pnpm --filter @naira/design-tokens test
corepack pnpm --filter @naira/ui-svelte check
corepack pnpm --filter @naira/ui-svelte test
~~~

- [ ] **Step 2: Run application checks**

~~~powershell
corepack pnpm --filter site build
corepack pnpm --filter workspace check
corepack pnpm --filter workspace build
~~~

- [ ] **Step 3: Run workbench and browser checks**

~~~powershell
task ui:workbench:build
task web:test:e2e
~~~

- [ ] **Step 4: Run formatting and diff checks**

~~~powershell
task format
git diff --check
~~~

Expected: no formatting changes and no whitespace errors. The subsystem is complete when tokens, primitives, workbench, site, workspace, and browser smoke tests all pass.
