export type ResolvedTokens = Record<string, string | number | boolean>;

export function resolveTokens(source: Record<string, unknown>): ResolvedTokens;
export function toCss(resolvedTokens: ResolvedTokens): string;
export function toDart(resolvedTokens: ResolvedTokens): string;
