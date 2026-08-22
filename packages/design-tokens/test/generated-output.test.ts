import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(resolve(packageRoot, 'src/generated/tokens.css'), 'utf8');
const dart = await readFile(resolve(packageRoot, 'src/generated/tokens.dart'), 'utf8');

it('contains the cross-platform foundation outputs', () => {
  expect(css).toContain('--naira-color-surface-canvas');
  expect(css).toContain("[data-theme='dark']");
  expect(css).toContain('--naira-density-compact-control-height');
  expect(css).toContain('--naira-typography-font-family-sans');
  expect(dart).toContain('class NairaDarkThemeTokens');
  expect(dart).toContain('static const colorSurfaceCanvas');
});
