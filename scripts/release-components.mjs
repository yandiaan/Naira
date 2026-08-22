import { access, readFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import semver from 'semver';

async function readComponentVersion(versionPath) {
  const source = await readFile(versionPath, 'utf8');

  if (versionPath.endsWith('.json')) {
    return JSON.parse(source).version;
  }

  return source.trim();
}

export async function loadReleaseComponents(manifestPath = resolve('release/components.json')) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const repositoryRoot = resolve(dirname(manifestPath), '..');
  const components = [];

  for (const component of manifest.components) {
    const componentPath = resolve(repositoryRoot, component.path);
    const versionPath = resolve(repositoryRoot, component.versionFile);
    const version = await readComponentVersion(versionPath);

    await access(componentPath);
    await access(versionPath);

    if (!semver.valid(version)) {
      throw new Error(`Invalid SemVer for ${component.name}: ${version}`);
    }

    components.push({ ...component, version });
  }

  return components;
}

if (basename(process.argv[1] ?? '') === 'release-components.mjs') {
  try {
    console.log(JSON.stringify(await loadReleaseComponents(), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
