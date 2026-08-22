# Testing rules

## Test layers

- Vitest for TypeScript unit and component tests.
- Testing Library assertions for user-visible component behavior.
- Playwright for browser E2E and shell smoke tests.
- go test for Go unit and package tests.
- Real PostgreSQL, Redis, and object storage for integration tests.
- Flutter unit, widget, repository/service, and integration tests in the mobile phase.

## Required checks

- commitlint;
- formatting;
- TypeScript, Astro, and Svelte checks;
- Go formatting, test, vet, and static analysis;
- OpenAPI validation and generated-client verification;
- migration validation;
- Docker image build and security scan;
- browser smoke tests for public, app, and admin shells.

## Test quality

- Write a failing behavior test before production behavior code.
- Verify the failure is caused by missing behavior, not a test typo.
- Prefer real code and real boundaries; mock only unavoidable external systems.
- Test one behavior per test and use names that describe the outcome.
- Cover validation, authorization, conflicts, retries, dependency failures, and empty/error/offline UI states.
- Do not inflate coverage with assertions that only inspect mocks or implementation details.

## Design system checks

- `task ui:tokens:check` validates generated CSS/Dart token outputs and token tests.
- `task ui:check` validates UI typecheck, component tests, and Storybook build.
- `task docs:check` validates local documentation links and formatting.
- `task ui:a11y` runs axe checks for public, planner, admin, and Storybook pilots.
- `task ui:visual` runs reviewed Playwright mobile visual baselines.
- Every component story covers the applicable state matrix, density, responsive,
  loading, error, empty, offline, and conflict states.
- Astro dev tooling must not be captured in visual baselines.

## Commands

Use the root Taskfile commands whenever available:

```text
task check
task test
task test:integration
task build
task docker:build
task release
```
