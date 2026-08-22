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
  'color.semantic.surface-canvas',
  'color.semantic.surface-elevated',
  'color.semantic.content-primary',
  'color.semantic.content-on-action',
  'color.semantic.border-strong',
  'color.semantic.action-accent',
  'color.semantic.focus-indicator',
  'color.semantic.status-success',
  'color.semantic.status-warning',
  'color.semantic.status-danger',
  'color.semantic.status-info',
] as const;

export type SemanticTokenName = (typeof semanticTokenNames)[number];

export { contrastRatio, meetsContrast } from './contrast';
export type { ContrastLevel } from './contrast';
