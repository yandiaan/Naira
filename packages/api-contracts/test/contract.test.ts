import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const generatedTypes = await readFile(resolve('generated/api.d.ts'), 'utf8');
const generatedClient = await readFile(resolve('generated/client.ts'), 'utf8');

describe('OpenAPI generated contract', () => {
  it('contains the health and version paths', () => {
    expect(generatedTypes).toContain('getLiveHealth');
    expect(generatedTypes).toContain('getReadyHealth');
    expect(generatedTypes).toContain('getVersion');
  });

  it('exports a typed client factory', () => {
    expect(generatedClient).toContain('createApiClient');
    expect(generatedClient).toContain('openapi-fetch');
  });
});
