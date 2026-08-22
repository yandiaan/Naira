import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

test('built public page contains the Naira foundation shell', async () => {
  const html = await readFile(resolve('dist/index.html'), 'utf8');

  assert.match(html, /<h1[^>]*>Rencanakan perjalanan/u);
  assert.match(html, /Rencanakan perjalanan outdoor/u);
  assert.match(html, /href="\/app"/u);
});
