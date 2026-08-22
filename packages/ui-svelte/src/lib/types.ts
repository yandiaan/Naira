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

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type ComboboxOption = { value: string; label: string };

export type MenuItem = { id: string; label: string; disabled?: boolean };

export type TabItem = { id: string; label: string; disabled?: boolean };

export type AccordionItem = { id: string; title: string; content: string };

export type BreadcrumbItem = { label: string; href?: string };

export type StepItem = {
  id: string;
  label: string;
  status: 'complete' | 'current' | 'upcoming';
};

export type TableColumn = { key: string; label: string };

export type TableRow = Record<string, string | number>;

export type ListItem = { id: string; label: string; description?: string };

export type TimelineItem = {
  id: string;
  title: string;
  time: string;
  status?: ComponentTone;
};
