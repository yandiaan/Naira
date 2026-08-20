import semver from 'semver';
import { basename } from 'node:path';

export function parseReleaseTag(tag) {
  if (typeof tag !== 'string' || !tag.startsWith('v')) {
    throw new Error('release tag must use vMAJOR.MINOR.PATCH format');
  }

  const version = tag.slice(1);
  if (!semver.valid(version)) {
    throw new Error('release tag must use vMAJOR.MINOR.PATCH format');
  }

  return { tag, version };
}

if (basename(process.argv[1] ?? '') === 'semver.mjs') {
  const tagIndex = process.argv.indexOf('--tag');
  const tag = tagIndex === -1 ? '' : process.argv[tagIndex + 1];

  try {
    console.log(JSON.stringify(parseReleaseTag(tag)));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
