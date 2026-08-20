import assert from 'node:assert/strict';
import test from 'node:test';
import { parseReleaseTag } from './semver.mjs';

test('parses a valid release tag', () => {
  assert.deepEqual(parseReleaseTag('v0.1.1'), {
    tag: 'v0.1.1',
    version: '0.1.1',
  });
});

test('parses a valid prerelease tag', () => {
  assert.equal(parseReleaseTag('v1.0.0-rc.1').version, '1.0.0-rc.1');
});

test('rejects a tag without the v prefix', () => {
  assert.throws(() => parseReleaseTag('release'), /vMAJOR\.MINOR\.PATCH/);
});
