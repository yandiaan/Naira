export type AdminRow = Readonly<{
  id: string;
  name: string;
  status: string;
  updated: string;
}>;

export const adminRows: readonly AdminRow[] = [
  { id: 'trip-1', name: 'Rinjani sunrise plan', status: 'Active', updated: 'Today' },
  { id: 'trip-2', name: 'Papandayan weekend', status: 'Draft', updated: 'Yesterday' },
];

export const adminFilters = {
  status: 'Active',
  region: 'West Indonesia',
} as const;
