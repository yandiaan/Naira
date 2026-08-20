import { execFileSync } from 'node:child_process';

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

const version = process.env.APP_VERSION ?? '0.1.0-dev';
const metadata = {
  version,
  gitSha: process.env.GIT_SHA ?? git(['rev-parse', '--short', 'HEAD']),
  buildTime: process.env.BUILD_TIME ?? new Date().toISOString(),
};

console.log(JSON.stringify(metadata));
