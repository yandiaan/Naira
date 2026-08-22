export type ResolvedTokens = Record<string, string | number | boolean>;
export type DesignTheme = 'light' | 'dark';

export function resolveTokens(source: Record<string, unknown>): ResolvedTokens;
export function resolveThemeTokens(
  source: Record<string, unknown>,
  theme: DesignTheme,
): ResolvedTokens;
export function toCss(
  resolvedTokens: ResolvedTokens,
  themes?: Record<DesignTheme, ResolvedTokens>,
): string;
export function toDart(
  resolvedTokens: ResolvedTokens,
  themes?: Record<DesignTheme, ResolvedTokens>,
): string;
