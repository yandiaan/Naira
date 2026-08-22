import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageSource = await readFile('src/pages/index.astro', 'utf8');
const featureGridSource = await readFile('src/components/FeatureGrid.astro', 'utf8');

test('exposes an outdoor planning value proposition', () => {
  assert.match(pageSource, /Rencana pendakian/i);
  assert.match(pageSource, /siapkan gear/i);
});

test('composes the public pilot from reusable discovery components', () => {
  assert.match(pageSource, /FeatureGrid/);
  assert.match(pageSource, /TrustSignal/);
  assert.match(featureGridSource, /DiscoveryCard/);
});

test('keeps a discovery action keyboard reachable', () => {
  assert.match(pageSource, /href="\/app"/);
});
