const referencePattern = /^\{([^}]+)\}$/u;

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

function resolveMap(rawTokens) {
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

export function resolveTokens(source) {
  const resolved = resolveMap(flattenTokens(source));

  return Object.fromEntries(
    Object.entries(resolved).filter(([path]) => !path.startsWith('color.theme.')),
  );
}

export function resolveThemeTokens(source, theme) {
  if (theme !== 'light' && theme !== 'dark') {
    throw new Error(`Unknown theme: ${theme}`);
  }

  const resolved = resolveMap(flattenTokens(source));
  const prefix = `color.theme.${theme}.`;

  return Object.fromEntries(
    Object.entries(resolved)
      .filter(([path]) => path.startsWith(prefix))
      .map(([path, value]) => [`color.${path.slice(prefix.length)}`, value]),
  );
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

function renderCssBlock(selector, tokens) {
  const lines = [`${selector} {`];

  for (const [path, value] of Object.entries(tokens)) {
    lines.push(`  --naira-${outputName(path)}: ${value};`);
  }

  lines.push('}', '');
  return lines;
}

export function toCss(resolvedTokens, themes = {}) {
  const lines = renderCssBlock(':root', resolvedTokens);

  for (const [theme, tokens] of Object.entries(themes)) {
    lines.push(...renderCssBlock(`[data-theme='${theme}']`, tokens));
  }

  return lines.join('\n');
}

function renderDartClass(className, tokens) {
  const lines = [`class ${className} {`, `  ${className}._();`];

  for (const [path, value] of Object.entries(tokens)) {
    const escaped = String(value).replaceAll("'", "\\'");
    lines.push(`  static const ${dartName(path)} = '${escaped}';`);
  }

  lines.push('}', '');
  return lines;
}

export function toDart(resolvedTokens, themes = {}) {
  const lines = renderDartClass('NairaTokens', resolvedTokens);

  for (const [theme, tokens] of Object.entries(themes)) {
    const className = `Naira${theme[0].toUpperCase()}${theme.slice(1)}ThemeTokens`;
    lines.push(...renderDartClass(className, tokens));
  }

  return lines.join('\n');
}
