import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { resolveThemeTokens, resolveTokens, toCss, toDart } from './token-engine.mjs';

const packageRoot = resolve(import.meta.dirname, '..');
const source = JSON.parse(await readFile(resolve(packageRoot, 'tokens.json'), 'utf8'));
const resolved = resolveTokens(source);
const themes = {
  light: resolveThemeTokens(source, 'light'),
  dark: resolveThemeTokens(source, 'dark'),
};
const generatedDirectory = resolve(packageRoot, 'src/generated');

await mkdir(generatedDirectory, { recursive: true });
await writeFile(resolve(generatedDirectory, 'tokens.css'), toCss(resolved, themes));
await writeFile(resolve(generatedDirectory, 'tokens.dart'), toDart(resolved, themes));
