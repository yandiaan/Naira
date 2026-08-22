# Naira Design System Documentation, Quality, and Release Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Make the design system documented, accessible, visually verifiable,
CI-enforced, architecture-aligned, and releasable through the existing
component-level SemVer model.

**Architecture:** Storybook is the living component reference. Markdown
documentation explains principles, content, accessibility, and contribution.
Playwright checks the public, workspace, admin, and Storybook surfaces. CI
validates generated tokens, component packages, browser checks, package
boundaries, and release metadata.

**Tech Stack:** Storybook 10.5.10, @storybook/addon-a11y, Playwright 1.62.1,
@axe-core/playwright 4.13.0, Vitest, Prettier, Taskfile, PowerShell, POSIX
shell, commitlint, and the existing SemVer scripts.

**Spec:** [docs/superpowers/specs/2026-08-22-naira-design-system-design.md](../specs/2026-08-22-naira-design-system-design.md)

## Global Constraints

- WCAG 2.2 AA is mandatory; AAA is applied where feasible.
- Every applicable component documents its state matrix, responsive contract,
  accessibility behavior, and content guidance.
- Storybook is the living component documentation.
- Generated token outputs are validated and never edited manually.
- Public, planner, and admin pilots must have browser smoke coverage.
- Accessibility status is not communicated by color alone.
- Documentation must be usable by an engineer with no prior product context.
- Design tokens and UI packages use independent SemVer metadata.
- Architecture changes require the relevant guide update and an ADR.
- CI scripts must check native command exit codes on Windows.
- Use only approved commit types and scopes; no Co-authored-by trailers.
- Do not add a release framework when the existing manifests and scripts are
  sufficient.

---

### Task 1: Create the design-system documentation structure

**Files:**
- Create: docs/design-system/README.md
- Create: docs/design-system/principles.md
- Create: docs/design-system/component-documentation-template.md
- Create: docs/design-system/content.md
- Create: docs/design-system/contributing.md
- Create: docs/design-system/releasing.md
- Create: scripts/check-doc-links.mjs
- Create: scripts/check-doc-links.test.mjs

**Interfaces:**
- README links to the normative spec, foundations, component workbench, pattern
  guidance, accessibility, content, color research, and release guidance.
- The component template defines purpose, anatomy, variants, states, responsive
  behavior, accessibility, content, tokens, examples, and tests.
- Contributing defines the consumer-first rule, RFC/ADR trigger, review gates,
  and deprecation process.
- Releasing explains independent versions for design-tokens and ui-svelte.

- [ ] Step 1: Create scripts/check-doc-links.mjs and
  scripts/check-doc-links.test.mjs. The checker reads the design-system
  README, resolves relative Markdown links, ignores external URLs, and exits
  non-zero for a missing local target.

- [ ] Step 2: Run the test before creating the documents and verify it fails
  for the missing files.

- [ ] Step 3: Write the documents with concrete Naira examples. Include the
  public discovery and planner workspace pilots, Indonesian-first content,
  compact density, async/sync states, and the rule that domain recipes stay in
  applications until reuse is proven.

- [ ] Step 4: Run the link test, pnpm exec prettier --check docs, and
  git diff --check. Expected: PASS.

- [ ] Step 5: Commit with:

~~~powershell
git add docs/design-system
git commit -m "docs(ui): Add design system documentation"
~~~

### Task 2: Add automated accessibility and visual browser checks

**Files:**
- Modify: package.json
- Modify: pnpm-lock.yaml
- Modify: playwright.config.ts
- Create: tests/e2e/design-system-a11y.spec.ts
- Create: tests/e2e/design-system-visual.spec.ts
- Create: tests/e2e/__snapshots__/design-system-visual.spec.ts-snapshots/public-pilot-site-mobile-chromium.png
- Create: tests/e2e/__snapshots__/design-system-visual.spec.ts-snapshots/planner-workspace-mobile-chromium.png
- Create: tests/e2e/__snapshots__/design-system-visual.spec.ts-snapshots/planner-workspace-desktop-chromium.png
- Modify: packages/ui-svelte/.storybook/preview.ts

**Interfaces:**
- Storybook is available to Playwright at port 6006 through a named project.
- Axe checks return zero serious or critical violations for the pilot stories.
- Visual checks cover the public landing pilot, planner shell, and a small
  stable Storybook state matrix at mobile and desktop viewports.
- Snapshot updates require an explicit Playwright update command and review.

- [ ] Step 1: Add the pinned axe dependency.

~~~powershell
pnpm add --save-dev @axe-core/playwright@4.13.0
~~~

Verify the exact version is recorded in package.json and pnpm-lock.yaml.

- [ ] Step 2: Write the failing accessibility test.

~~~ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('public pilot has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(blocking).toEqual([]);
});
~~~

- [ ] Step 3: Run the focused test and verify the missing dependency, server, or
  violation causes a failure rather than hiding the result.

- [ ] Step 4: Add a Storybook project and deterministic webServer entry to
  playwright.config.ts. Keep existing site and workspace projects. Use mobile
  and desktop device variants for the pilot checks.

- [ ] Step 5: Implement visual assertions for public landing, planner shell,
  admin specimen, Button states, async states, and dark-ready theme. Capture
  only stable surfaces; do not snapshot dynamic timestamps or generated IDs.

- [ ] Step 6: Run:

~~~powershell
pnpm exec playwright test tests/e2e/design-system-a11y.spec.ts
pnpm exec playwright test tests/e2e/design-system-visual.spec.ts
~~~

Expected: PASS after intentional baseline snapshots are created and reviewed.

- [ ] Step 7: Commit with:

~~~powershell
git add package.json pnpm-lock.yaml playwright.config.ts tests/e2e packages/ui-svelte/.storybook
git commit -m "test(ui): Add accessibility and visual gates"
~~~

### Task 3: Add documentation and Storybook quality gates to local tasks and CI

**Files:**
- Modify: Taskfile.yml
- Modify: infra/ci/validate.ps1
- Modify: infra/ci/validate.sh
- Create: scripts/fixtures/valid-doc-link.md
- Create: scripts/fixtures/missing-doc-link.md

**Interfaces:**
- task ui:tokens:check validates generated tokens.
- task ui:check runs UI typecheck, component tests, and workbench build.
- task ui:a11y runs the focused Playwright accessibility suite.
- task ui:visual runs stable visual checks.
- task docs:check validates local documentation links and formatting.
- CI invokes the same commands and propagates native failures on Windows.

- [ ] Step 1: Add scripts/fixtures/valid-doc-link.md and
  scripts/fixtures/missing-doc-link.md, then write the checker test so the
  missing target exits non-zero while the valid target passes.

- [ ] Step 2: Run the checker and verify it exits non-zero for the invalid link.

- [ ] Step 3: Add the commands to Taskfile.yml:

~~~yaml
  ui:check:
    deps: [ui:tokens:check]
    cmds:
      - pnpm --filter @naira/ui-svelte check
      - pnpm --filter @naira/ui-svelte test
      - task ui:workbench:build

  ui:a11y:
    cmds:
      - pnpm exec playwright test tests/e2e/design-system-a11y.spec.ts

  ui:visual:
    cmds:
      - pnpm exec playwright test tests/e2e/design-system-visual.spec.ts

  docs:check:
    cmds:
      - node scripts/check-doc-links.mjs
      - pnpm exec prettier --check docs
~~~

- [ ] Step 4: Keep scripts/check-doc-links.mjs from scanning node_modules,
  generated output, or external URLs. Its test fixture paths must be explicit.

- [ ] Step 5: Add ui:check and docs:check to both validate.ps1 and
  validate.sh. Preserve explicit PowerShell LASTEXITCODE checks after every
  native command.

- [ ] Step 6: Run task docs:check, task ui:check, and task ui:a11y.
  Expected: PASS. Run task ui:visual when the local browser environment is
  available; report an environment blocker rather than weakening the gate.

- [ ] Step 7: Commit with:

~~~powershell
git add Taskfile.yml infra/ci package.json scripts/check-doc-links.mjs
git commit -m "ci(ui): Add design system quality gates"
~~~

### Task 4: Align architecture guides and record the package boundary ADR

**Files:**
- Create: docs/decisions/003-design-system-boundary.md
- Create: scripts/architecture-docs.test.mjs
- Modify: .agents/architecture.md
- Modify: .agents/structure.md
- Modify: .agents/conventions.md
- Modify: .agents/testing.md

**Interfaces:**
- ADR 003 records design-tokens, ui-svelte, application, and future Flutter
  boundaries, Tailwind's role, and the domain-recipe promotion rule.
- Architecture guide describes the shared package dependency direction.
- Structure guide includes docs/design-system and pattern locations.
- Conventions guide defines semantic token use, component API style, naming,
  density, and no raw hex in component code.
- Testing guide includes Storybook, axe, visual, state-matrix, and responsive
  checks.

- [ ] Step 1: Write scripts/architecture-docs.test.mjs so it reads the four
  guide files and ADR 003 and requires the boundary terms to appear.

- [ ] Step 2: Run the assertion before editing and verify it fails.

- [ ] Step 3: Add ADR 003 with status Accepted, date 2026-08-22, context,
  decision, rejected alternatives, consequences, and trigger for revisiting.

- [ ] Step 4: Update the four normative guides without duplicating the whole
  spec. Link to the design-system spec and implementation plans.

- [ ] Step 5: Run task docs:check, task format, and git diff --check.

- [ ] Step 6: Commit with:

~~~powershell
git add .agents docs/decisions/003-design-system-boundary.md scripts/architecture-docs.test.mjs
git commit -m "docs(ui): Record design system boundaries"
~~~

### Task 5: Verify independent SemVer and release metadata

**Files:**
- Create: scripts/release-components.mjs
- Create: scripts/release-components.test.mjs
- Create: docs/design-system/release-checklist.md
- Test: release/components.json
- Modify: infra/ci/release.ps1
- Modify: infra/ci/release.sh

**Interfaces:**
- The release manifest includes design-tokens and ui-svelte as independent
  components with package version files.
- The release check validates SemVer values without publishing or tagging.
- The release checklist explains patch, minor, and major package changes,
  generated-token updates, changelog entries, and migration notes.
- Release scripts never use latest for deployment and never publish silently.

- [ ] Step 1: Write release metadata tests for design-tokens, ui-svelte,
  site, workspace, api-contracts, and api.

~~~js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadReleaseComponents } from './release-components.mjs';

test('design-system packages have independent release entries', async () => {
  const actualNames = (await loadReleaseComponents()).map(({ name }) => name);
  const requiredNames = [
    'api',
    'site',
    'workspace',
    'api-contracts',
    'design-tokens',
    'ui-svelte',
  ];
  assert.deepEqual(actualNames, requiredNames);
});
~~~

- [ ] Step 2: Run node --test scripts/release-components.test.mjs and verify
  it fails because scripts/release-components.mjs does not exist yet.

- [ ] Step 3: Implement the manifest loader using node:fs/promises and semver.
  Validate that each path and versionFile exists and each version value parses
  as a valid SemVer value.

- [ ] Step 4: Add the release checklist and invoke the read-only validation
  from the provider-neutral release scripts.

- [ ] Step 5: Run:

~~~powershell
node --test scripts/release-components.test.mjs
pnpm release:validate --tag v0.1.0
task release:validate
~~~

Expected: PASS without creating a tag or publishing an artifact.

- [ ] Step 6: Commit with:

~~~powershell
git add scripts/release-components.test.mjs docs/design-system release infra/ci
git commit -m "test(ui): Validate design system releases"
~~~

### Task 6: Run the complete design-system quality checkpoint

**Files:**
- Test: packages/design-tokens
- Test: packages/ui-svelte
- Test: apps/site
- Test: apps/workspace
- Test: tests/e2e
- Test: docs and CI scripts

- [ ] Step 1: Run token, UI, docs, and browser checks.

~~~powershell
task ui:tokens:check
task ui:check
task docs:check
task web:test:e2e
~~~

- [ ] Step 2: Run full repository checks.

~~~powershell
task check
task test
task build
~~~

- [ ] Step 3: Review the generated CSS and Dart diff. Verify no generated file
  was edited by hand and no raw color values leaked into component source.

- [ ] Step 4: Run git diff --check, inspect git status --short --branch, and
  verify every plan task is checked only after its command output passes.

- [ ] Step 5: Commit only remaining scoped verification or documentation
  changes. The final design-system handoff requires a clean working tree.
