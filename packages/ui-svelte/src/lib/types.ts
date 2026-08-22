export type Density = 'comfortable' | 'compact';

export type ControlSize = 'sm' | 'md' | 'lg';

export type ComponentTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

export type SyncState =
  | 'idle'
  | 'dirty'
  | 'saving'
  | 'queued'
  | 'syncing'
  | 'synced'
  | 'offline'
  | 'retryable-failure'
  | 'blocked'
  | 'conflict';
