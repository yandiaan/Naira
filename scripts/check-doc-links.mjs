import { access, readFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';

const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/gu;

function isExternalLink(target) {
  return /^(?:[a-z]+:|\/\/|#)/iu.test(target);
}

export async function checkDocLinks(markdownPath) {
  const source = await readFile(markdownPath, 'utf8');
  const missing = [];

  for (const match of source.matchAll(markdownLinkPattern)) {
    const target = match[1].split('#', 1)[0].trim();

    if (!target || isExternalLink(target)) {
      continue;
    }

    const targetPath = resolve(dirname(markdownPath), decodeURIComponent(target));

    try {
      await access(targetPath);
    } catch {
      missing.push(targetPath);
    }
  }

  return [...new Set(missing)].sort();
}

if (basename(process.argv[1] ?? '') === 'check-doc-links.mjs') {
  const documentPath = resolve(process.argv[2] ?? 'docs/design-system/README.md');

  try {
    const missing = await checkDocLinks(documentPath);

    if (missing.length > 0) {
      for (const path of missing) {
        console.error(`Missing local documentation link: ${path}`);
      }
      process.exitCode = 1;
    } else {
      console.log(`Documentation links OK: ${documentPath}`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
