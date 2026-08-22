import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const page = await readFile(resolve('src/routes/(admin)/admin/+page.svelte'), 'utf8');
const fixture = await readFile(resolve('src/lib/fixtures/admin-pilot.ts'), 'utf8');

describe('admin pilot boundaries', () => {
  it('defines an operational table and filter specimen', () => {
    expect(fixture).toContain('adminRows');
    expect(page).toContain('FilterBar');
    expect(page).toContain('Table');
  });

  it('keeps the specimen API-independent', () => {
    expect(`${page}${fixture}`).not.toContain('fetch(');
    expect(`${page}${fixture}`).not.toContain('localStorage');
  });
});
