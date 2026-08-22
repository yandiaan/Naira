import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const files = await Promise.all(
  [
    'AGENTS.md',
    '.agents/architecture.md',
    '.agents/conventions.md',
    '.agents/structure.md',
    '.agents/testing.md',
    'docs/decisions/003-design-system-boundary.md',
  ].map(async (file) => [file, await readFile(resolve(file), 'utf8')]),
);

const source = Object.fromEntries(files);

test('agent guides document the design-system boundary', () => {
  assert.match(source['AGENTS.md'], /design[- ]system/i);
  assert.match(source['.agents/architecture.md'], /design-tokens.*ui-svelte/is);
  assert.match(source['.agents/conventions.md'], /semantic token/i);
  assert.match(source['.agents/structure.md'], /docs\/design-system/i);
  assert.match(source['.agents/testing.md'], /Storybook.*Playwright/is);
  assert.match(source['docs/decisions/003-design-system-boundary.md'], /Status: Accepted/);
});
