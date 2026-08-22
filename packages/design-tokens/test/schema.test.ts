import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { resolveThemeTokens } from '../scripts/token-engine.mjs';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(await readFile(resolve(packageRoot, 'tokens.json'), 'utf8'));
const css = await readFile(resolve(packageRoot, 'src/generated/tokens.css'), 'utf8');

describe('design token schema', () => {
  it('contains themed semantic and density groups', () => {
    expect(source.color.primitive).toHaveProperty('forest-900');
    expect(source.color.semantic).toHaveProperty('surface-canvas');
    expect(source.color.theme.light).toHaveProperty('surface-canvas');
    expect(source.color.theme.dark).toHaveProperty('surface-canvas');
    expect(source.density).toHaveProperty('comfortable');
    expect(source.density).toHaveProperty('compact');
  });

  it('resolves a theme semantic alias', () => {
    expect(resolveThemeTokens(source, 'dark')['color.surface-canvas']).toBe('#121A16');
  });

  it('emits a dark theme selector in generated CSS', () => {
    expect(css).toContain("[data-theme='dark']");
    expect(css).toContain('--naira-color-surface-canvas');
  });
});
