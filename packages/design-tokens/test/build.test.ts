import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { resolveTokens } from '../scripts/token-engine.mjs';

const tokenSource = JSON.parse(
  await readFile(resolve(dirname(fileURLToPath(import.meta.url)), '../tokens.json'), 'utf8'),
);

describe('design token engine', () => {
  it('resolves required semantic tokens', () => {
    const resolved = resolveTokens(tokenSource);

    expect(resolved['color.semantic.surface-default']).toBe('#ffffff');
    expect(resolved['color.semantic.action-primary']).toBe('#2563eb');
  });

  it('rejects unresolved semantic references', () => {
    expect(() =>
      resolveTokens({
        color: { semantic: { missing: '{unknown.token}' } },
      }),
    ).toThrow('unknown.token');
  });
});
