import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import openapiTS, { astToString } from 'openapi-typescript';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const schemaPath = resolve(packageRoot, 'openapi/openapi.yaml');
const outputDirectory = resolve(packageRoot, 'generated');
const schema = astToString(await openapiTS(pathToFileURL(schemaPath)));

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  resolve(outputDirectory, 'api.d.ts'),
  `// Generated from openapi/openapi.yaml. Do not edit by hand.\n\n${schema.trimEnd()}\n`,
);
await writeFile(
  resolve(outputDirectory, 'client.ts'),
  `// Generated client boundary. Keep behavior-free wrappers here.\nimport createClient from 'openapi-fetch';\nimport type { paths } from './api';\n\nexport function createApiClient(baseUrl: string) {\n  return createClient<paths>({ baseUrl });\n}\n`,
);
