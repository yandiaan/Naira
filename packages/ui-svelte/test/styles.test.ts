import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

const stylesPath = resolve(dirname(fileURLToPath(import.meta.url)), '../src/styles.css');
const styles = await readFile(stylesPath, 'utf8');

it('loads Tailwind and maps semantic token namespaces', () => {
  expect(styles).toMatch(/@import ['"]tailwindcss['"]/u);
  expect(styles).toMatch(/@import ['"]@naira\/design-tokens\/tokens\.css['"]/u);
  expect(styles).toContain('--font-sans');
  expect(styles).toContain('--color-surface-canvas');
});
