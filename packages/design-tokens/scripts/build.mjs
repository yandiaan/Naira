import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { toCss, toDart, resolveTokens } from './token-engine.mjs';

const packageRoot = resolve(import.meta.dirname, '..');
const source = JSON.parse(await readFile(resolve(packageRoot, 'tokens.json'), 'utf8'));
const resolved = resolveTokens(source);
const generatedDirectory = resolve(packageRoot, 'src/generated');

await mkdir(generatedDirectory, { recursive: true });
await writeFile(resolve(generatedDirectory, 'tokens.css'), toCss(resolved));
await writeFile(resolve(generatedDirectory, 'tokens.dart'), toDart(resolved));
