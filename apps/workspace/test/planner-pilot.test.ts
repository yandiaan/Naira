import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const fixture = await readFile(resolve('src/lib/fixtures/planner-pilot.ts'), 'utf8');
const recipes = await Promise.all(
  [
    'src/lib/recipes/TripSummaryRecipe.svelte',
    'src/lib/recipes/GearChecklistRecipe.svelte',
    'src/lib/recipes/ItineraryRecipe.svelte',
  ].map((file) => readFile(resolve(file), 'utf8')),
).then((files) => files.join('\n'));

describe('planner pilot boundaries', () => {
  it('defines immutable fixture states for planning and sync', () => {
    expect(fixture).toContain('pilotTrip');
    expect(fixture).toContain('offline');
    expect(fixture).toContain('conflict');
    expect(fixture).toContain('readonly');
  });

  it('composes recipes from shared UI states', () => {
    expect(recipes).toContain('SyncStatus');
    expect(recipes).toContain('Progress');
    expect(recipes).toContain('AsyncState');
  });

  it('keeps pilot recipes free from persistence calls', () => {
    expect(recipes).not.toContain('fetch(');
    expect(recipes).not.toContain('localStorage');
  });
});
