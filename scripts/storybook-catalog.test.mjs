import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const indexSource = await readFile(resolve('packages/ui-svelte/src/index.ts'), 'utf8');
const catalogSource = await readFile(
  resolve('packages/ui-svelte/stories/Catalog.stories.ts'),
  'utf8',
);
const exportedComponents = [...indexSource.matchAll(/export \{ default as (\w+) \}/gu)].map(
  ([, name]) => name,
);

test('every exported UI component has a catalog story', () => {
  const missing = exportedComponents.filter(
    (name) => !catalogSource.includes(`export const ${name}`),
  );

  assert.deepEqual(missing, []);
  assert.ok(exportedComponents.length >= 50);
});
