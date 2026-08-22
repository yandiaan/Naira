import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import test from 'node:test';
import { checkDocLinks } from './check-doc-links.mjs';

test('accepts a document whose local link exists', async () => {
  const missing = await checkDocLinks(resolve('scripts/fixtures/valid-doc-link.md'));
  assert.deepEqual(missing, []);
});

test('reports a document whose local link is missing', async () => {
  const missing = await checkDocLinks(resolve('scripts/fixtures/missing-doc-link.md'));
  assert.deepEqual(missing, [resolve('scripts/fixtures/does-not-exist.md')]);
});
