# Naira Tooling and Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Establish a readable, cross-platform monorepo baseline with exact commit governance, shared formatting, agent guidance, and repeatable developer commands.

**Architecture:** The root is a pnpm workspace for TypeScript applications and packages. Go and Flutter retain their native module conventions and are invoked through a root Taskfile. Governance files are small indexes with detailed rules split under .agents/.

**Tech Stack:** pnpm, Node.js, TypeScript, Prettier, ESLint configuration packages, commitlint, Husky, Taskfile, Go, Flutter, PowerShell, and POSIX shell scripts where CI requires them.

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

### Task 1: Create the pnpm workspace root

**Files:**
- Create: package.json
- Create: pnpm-workspace.yaml
- Create: .npmrc
- Create: .gitignore
- Create: .editorconfig

**Interfaces:**
- Produces the workspace root consumed by every TypeScript application and package plan.
- Produces repository-wide ignore and editor rules consumed by all future files.

- [ ] **Step 1: Resolve and pin the local pnpm version**

Run:

~~~powershell
corepack pnpm --version
~~~

Write the exact major.minor.patch output into package.json under packageManager. Do not use latest, next, or an unpinned range.

- [ ] **Step 2: Write the workspace manifest**

Create pnpm-workspace.yaml:

~~~yaml
packages:
  - apps/*
  - packages/*
~~~

Keep services/ and clients/ outside pnpm package discovery because Go and Flutter use their native package managers.

- [ ] **Step 3: Write the root package manifest**

Create package.json with name naira, private true, the exact packageManager value from Step 1, and these scripts:

~~~json
{
  "scripts": {
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "check:repo": "pnpm run format"
  }
}
~~~

Install Prettier as an exact dev dependency. Do not leave any dependency on a floating tag.

- [ ] **Step 4: Add repository defaults**

Create .npmrc:

~~~ini
shared-workspace-lockfile=true
strict-peer-dependencies=true
save-exact=true
~~~

Create .editorconfig:

~~~ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.go]
indent_style = tab

[*.dart]
indent_size = 2
~~~

- [ ] **Step 5: Add the initial ignore rules**

.gitignore must exclude generated and secret material without hiding source files:

~~~gitignore
node_modules/
.pnpm-store/
dist/
build/
.svelte-kit/
.astro/
.env
.env.*
!.env.example
coverage/
test-results/
playwright-report/
.task/
bin/
tmp/
~~~

- [ ] **Step 6: Verify workspace installation**

Run:

~~~powershell
corepack pnpm install
corepack pnpm run check:repo
~~~

Expected: the lockfile is created, Prettier reports no source files requiring changes, and the command exits with code 0.

- [ ] **Step 7: Commit the root baseline**

~~~powershell
git add package.json pnpm-workspace.yaml .npmrc .gitignore .editorconfig pnpm-lock.yaml
git commit -m "chore: Initialize workspace root"
~~~

### Task 2: Add shared formatting and TypeScript configuration

**Files:**
- Create: prettier.config.mjs
- Create: .prettierignore
- Create: tsconfig.base.json
- Create: packages/tsconfig/package.json
- Create: packages/tsconfig/base.json
- Create: packages/eslint-config/package.json
- Create: packages/eslint-config/base.mjs

**Interfaces:**
- Produces @naira/tsconfig for Astro, SvelteKit, and shared TypeScript packages.
- Produces formatter configuration with printWidth 100.
- Produces a framework-neutral ESLint base that web plans can extend.

- [ ] **Step 1: Write the formatter configuration**

Create prettier.config.mjs:

~~~js
/** @type {import('prettier').Config} */
export default {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  endOfLine: 'lf',
};
~~~

The web plan adds the Svelte and Astro plugins without changing these repository-wide values.

- [ ] **Step 2: Exclude generated files from formatting**

Create .prettierignore:

~~~text
node_modules
dist
build
.svelte-kit
.astro
coverage
test-results
playwright-report
generated
~~~

- [ ] **Step 3: Write strict TypeScript defaults**

Create tsconfig.base.json:

~~~json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  }
}
~~~

- [ ] **Step 4: Package the shared TypeScript config**

Create packages/tsconfig/package.json:

~~~json
{
  "name": "@naira/tsconfig",
  "private": true,
  "exports": {
    "./base.json": "./base.json"
  }
}
~~~

Create packages/tsconfig/base.json containing the same strict options as the root tsconfig.base.json. Application-specific configs may extend it only to add framework-generated files or DOM libraries.

- [ ] **Step 5: Add the framework-neutral ESLint package boundary**

Create packages/eslint-config/package.json:

~~~json
{
  "name": "@naira/eslint-config",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./base.mjs"
  }
}
~~~

Create packages/eslint-config/base.mjs with rules for no-explicit-any, unused variables, import ordering, and consistent type imports. Astro and Svelte-specific parsers are added by the web plan.

- [ ] **Step 6: Verify configuration parsing**

Run:

~~~powershell
corepack pnpm exec prettier --check prettier.config.mjs tsconfig.base.json packages
~~~

Expected: PASS with no formatting changes required.

- [ ] **Step 7: Commit shared configuration**

~~~powershell
git add prettier.config.mjs .prettierignore tsconfig.base.json packages/tsconfig packages/eslint-config
git commit -m "chore: Add shared code configuration"
~~~

### Task 3: Install and enforce commitlint

**Files:**
- Modify: package.json
- Create: commitlint.config.ts
- Create: .husky/commit-msg

**Interfaces:**
- Produces local commit-msg validation.
- Produces stdin-based commitlint validation for CI and test fixtures.

- [ ] **Step 1: Add exact commitlint dependencies**

Run:

~~~powershell
corepack pnpm add --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/format @commitlint/types husky
~~~

Pin the exact versions written to package.json and commit the lockfile.

- [ ] **Step 2: Write the approved commitlint configuration**

Create commitlint.config.ts:

~~~ts
import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', [
      'chore',
      'docs',
      'style',
      'feat',
      'fix',
      'refactor',
      'test',
    ]],
    'subject-case': [RuleConfigSeverity.Error, 'always', ['sentence-case']],
    'scope-enum': [RuleConfigSeverity.Error, 'always', ['ui', 'api', '']],
    'trailer-exists': [RuleConfigSeverity.Error, 'never', 'Co-authored-by'],
  },
};

export default Configuration;
~~~

- [ ] **Step 3: Initialize the hook**

Run:

~~~powershell
corepack pnpm exec husky init
~~~

Create .husky/commit-msg:

~~~sh
#!/usr/bin/env sh
pnpm exec commitlint --edit "$1"
~~~

Ensure the hook is executable in Git and does not invoke a global Node or pnpm installation.

- [ ] **Step 4: Test valid and invalid messages**

Run:

~~~powershell
'feat(api): add health endpoint' | corepack pnpm exec commitlint
'feat(database): Add health endpoint' | corepack pnpm exec commitlint
$invalidMessage = @('feat(api): add health endpoint', '', 'Co-authored-by: Other <other@example.com>') -join "`n"
$invalidMessage | corepack pnpm exec commitlint
~~~

Expected: the first command passes; the second fails for scope and subject-case; the third fails for the forbidden trailer.

- [ ] **Step 5: Commit commitlint governance**

~~~powershell
git add package.json pnpm-lock.yaml commitlint.config.ts .husky
git commit -m "chore: Enforce commit message conventions"
~~~

### Task 4: Add the root Taskfile and developer commands

**Files:**
- Create: Taskfile.yml
- Modify: package.json

**Interfaces:**
- Produces task format, task format:write, task commitlint, and task check:repo.
- Later subsystem plans extend the same Taskfile with build, test, Docker, and release tasks.

- [ ] **Step 1: Write the initial Taskfile**

Create Taskfile.yml:

~~~yaml
version: '3'

tasks:
  format:
    cmds:
      - pnpm exec prettier --check .

  format:write:
    cmds:
      - pnpm exec prettier --write .

  commitlint:
    cmds:
      - pnpm exec commitlint --from=HEAD~1 --to=HEAD

  check:repo:
    deps: [format]
~~~

- [ ] **Step 2: Add matching root scripts**

Add these scripts to package.json:

~~~json
{
  "scripts": {
    "format": "task format",
    "format:write": "task format:write",
    "check:repo": "task check:repo"
  }
}
~~~

- [ ] **Step 3: Verify the command surface**

Run:

~~~powershell
task --list
task check:repo
corepack pnpm run check:repo
~~~

Expected: all commands exit with code 0 and list the same initial checks.

- [ ] **Step 4: Commit the command surface**

~~~powershell
git add Taskfile.yml package.json
git commit -m "chore: Add repository task commands"
~~~

### Task 5: Create modular agent guidance

**Files:**
- Create: AGENTS.md
- Create: .agents/architecture.md
- Create: .agents/conventions.md
- Create: .agents/structure.md
- Create: .agents/testing.md

**Interfaces:**
- Produces the agent instruction entry point required by every implementation task.
- Produces repository rules that future agents must read before editing code.

- [ ] **Step 1: Write the root index**

Create AGENTS.md:

~~~markdown
# Naira Agent Guide

Read these documents before changing the repository:

- .agents/architecture.md
- .agents/conventions.md
- .agents/structure.md
- .agents/testing.md

The four documents are normative together with this index. When a task changes an architecture boundary, update the relevant guide and an ADR in docs/decisions/.
~~~

- [ ] **Step 2: Write architecture rules**

.agents/architecture.md must state:

- Astro owns public/discovery rendering;
- SvelteKit owns authenticated app/admin routing;
- Go owns API authorization and business boundaries;
- PostgreSQL is authoritative;
- Redis is not authoritative;
- clients never access databases directly;
- modules communicate through explicit application ports;
- microservices are not introduced without a reviewed ADR.

- [ ] **Step 3: Write convention rules**

.agents/conventions.md must state:

- exact commitlint types, scopes, sentence-case subject, and trailer prohibition;
- TypeScript strictness and no unexplained any;
- print width 100;
- feature-local components and no generic dumping-ground utilities;
- structured API errors;
- UTC timestamps;
- no secrets in source or logs.

- [ ] **Step 4: Write structure rules**

.agents/structure.md must map apps/site, apps/workspace, services/api, packages, clients/mobile, infra, docs, and tests to their owners. It must explicitly state that domain logic does not belong in page components or generic shared packages.

- [ ] **Step 5: Write testing rules**

.agents/testing.md must define:

- Vitest for TypeScript unit/component tests;
- Playwright for browser E2E;
- go test for Go unit tests;
- real PostgreSQL/Redis/object storage for integration tests;
- Flutter unit/widget/integration test layers;
- migration and OpenAPI validation in CI;
- test commands exposed through Taskfile.yml.

- [ ] **Step 6: Verify guide references**

Run:

~~~powershell
rg -n "\\.agents/(architecture|conventions|structure|testing)\\.md" AGENTS.md
corepack pnpm exec prettier --check AGENTS.md .agents
~~~

Expected: four references are found and formatting passes.

- [ ] **Step 7: Commit the agent guide**

~~~powershell
git add AGENTS.md .agents
git commit -m "docs: Add modular agent guide"
~~~

### Task 6: Add repository README and decision template

**Files:**
- Create: README.md
- Create: docs/decisions/README.md
- Create: docs/decisions/000-template.md

**Interfaces:**
- Produces onboarding instructions for the foundation repository.
- Produces a consistent ADR format for deferred identity, cloud, route, and workbench choices.

- [ ] **Step 1: Write the repository README**

README.md must include product scope, repository map, prerequisites, and these commands:

~~~powershell
corepack pnpm install
task dev
task check
task test
task test:integration
~~~

It must state that business flows are intentionally outside the foundation scaffold.

- [ ] **Step 2: Write the ADR index**

docs/decisions/README.md must explain that every deferred decision records context, decision, alternatives, consequences, and trigger. It must link to the foundation spec.

- [ ] **Step 3: Write the ADR template**

Create docs/decisions/000-template.md:

~~~markdown
# ADR NNN: Title

- Status: Proposed
- Date: YYYY-MM-DD

## Context

## Decision

## Alternatives considered

## Consequences

## Trigger for revisiting
~~~

- [ ] **Step 4: Verify documentation**

Run:

~~~powershell
corepack pnpm exec prettier --check README.md docs/decisions
~~~

Expected: PASS.

- [ ] **Step 5: Commit repository documentation**

~~~powershell
git add README.md docs/decisions
git commit -m "docs: Add repository onboarding guide"
~~~

### Task 7: Verify the governance subsystem

**Files:**
- Test: package.json, commitlint.config.ts, .husky/commit-msg, Taskfile.yml, AGENTS.md, .agents/*, README.md

**Interfaces:**
- Consumes all files created by Tasks 1-6.
- Produces a clean governance baseline for the web, backend, and infrastructure plans.

- [ ] **Step 1: Install from the lockfile**

Run:

~~~powershell
corepack pnpm install --frozen-lockfile
~~~

Expected: PASS without changing pnpm-lock.yaml.

- [ ] **Step 2: Run repository checks**

Run:

~~~powershell
task check:repo
task commitlint
~~~

Expected: both commands pass for the current commit range.

- [ ] **Step 3: Check the working tree**

Run:

~~~powershell
git diff --check
git status --short
~~~

Expected: no whitespace errors and no uncommitted changes.

- [ ] **Step 4: Mark the plan complete**

The governance subsystem is complete only when the root install, formatter, commitlint, hooks, Taskfile, agent guides, README, and ADR template all pass from a clean checkout.
