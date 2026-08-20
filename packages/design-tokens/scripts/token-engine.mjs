const referencePattern = /^\{([^}]+)\}$/;

function flattenTokens(value, prefix = [], output = new Map()) {
  for (const [key, child] of Object.entries(value)) {
    const path = [...prefix, key];

    if (child !== null && typeof child === 'object' && !Array.isArray(child)) {
      flattenTokens(child, path, output);
      continue;
    }

    output.set(path.join('.'), child);
  }

  return output;
}

export function resolveTokens(source) {
  const rawTokens = flattenTokens(source);
  const resolvedTokens = {};
  const resolving = new Set();

  function resolvePath(path) {
    if (path in resolvedTokens) {
      return resolvedTokens[path];
    }

    if (!rawTokens.has(path)) {
      throw new Error(`Unknown token reference: ${path}`);
    }

    if (resolving.has(path)) {
      throw new Error(`Circular token reference: ${path}`);
    }

    resolving.add(path);
    const value = rawTokens.get(path);
    const reference = typeof value === 'string' ? value.match(referencePattern) : null;
    const resolved = reference ? resolvePath(reference[1]) : value;
    resolving.delete(path);
    resolvedTokens[path] = resolved;

    return resolved;
  }

  for (const path of rawTokens.keys()) {
    resolvePath(path);
  }

  return resolvedTokens;
}

function outputName(path) {
  const parts = path.split('.');
  const category = parts.shift();

  if (parts[0] === 'primitive' || parts[0] === 'semantic') {
    parts.shift();
  }

  return [category, ...parts].join('-');
}

function dartName(path) {
  return outputName(path)
    .split(/[-.]/u)
    .map((part, index) => (index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`))
    .join('');
}

export function toCss(resolvedTokens) {
  const lines = [':root {'];

  for (const [path, value] of Object.entries(resolvedTokens)) {
    lines.push(`  --naira-${outputName(path)}: ${value};`);
  }

  lines.push('}', '');
  return lines.join('\n');
}

export function toDart(resolvedTokens) {
  const lines = ['class NairaTokens {', '  NairaTokens._();'];

  for (const [path, value] of Object.entries(resolvedTokens)) {
    const escaped = String(value).replaceAll("'", "\\'");
    lines.push(`  static const ${dartName(path)} = '${escaped}';`);
  }

  lines.push('}', '');
  return lines.join('\n');
}
