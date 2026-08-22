import assert from 'node:assert/strict';
import test from 'node:test';
import { loadReleaseComponents } from './release-components.mjs';

test('release manifest includes independent design-system packages', async () => {
  const components = await loadReleaseComponents();
  const names = components.map(({ name }) => name);

  assert.deepEqual(names, [
    'api',
    'site',
    'workspace',
    'api-contracts',
    'design-tokens',
    'ui-svelte',
  ]);
});
