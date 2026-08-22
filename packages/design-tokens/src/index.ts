export const semanticTokenNames = [
  'color.semantic.surface-default',
  'color.semantic.surface-subtle',
  'color.semantic.content-default',
  'color.semantic.content-muted',
  'color.semantic.border-default',
  'color.semantic.action-primary',
  'color.semantic.feedback-success',
  'color.semantic.feedback-danger',
  'color.semantic.feedback-warning',
] as const;

export type SemanticTokenName = (typeof semanticTokenNames)[number];

export { contrastRatio, meetsContrast } from './contrast';
export type { ContrastLevel } from './contrast';
