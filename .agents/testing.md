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
