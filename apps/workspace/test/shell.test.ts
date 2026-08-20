import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const appShell = await readFile(resolve('src/lib/shell/AppShell.svelte'), 'utf8');
const adminShell = await readFile(resolve('src/lib/shell/AdminShell.svelte'), 'utf8');
const source = await Promise.all(
  [
    'src/lib/session/principal.ts',
    'src/routes/(app)/+layout.svelte',
    'src/routes/(app)/app/+page.svelte',
    'src/routes/(admin)/+layout.svelte',
    'src/routes/(admin)/admin/+page.svelte',
  ].map((file) => readFile(resolve(file), 'utf8')),
).then((files) => files.join('\n'));

describe('workspace shell boundaries', () => {
  it('keeps app and admin shells distinct', () => {
    expect(appShell).not.toBe(adminShell);
    expect(appShell).toContain('Planner workspace');
    expect(adminShell).toContain('Administration shell');
  });

  it('does not write access tokens to browser storage', async () => {
    expect(`${appShell}${adminShell}${source}`).not.toContain('localStorage.setItem');
  });
});
