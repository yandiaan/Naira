import type { SyncState } from '@naira/ui-svelte';

export type PilotTrip = Readonly<{
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  syncStatus: SyncState;
}>;

export type PilotGearItem = Readonly<{
  id: string;
  label: string;
  category: string;
  checked: boolean;
}>;

export type PilotItineraryItem = Readonly<{
  id: string;
  time: string;
  title: string;
  location: string;
}>;

export const pilotTrip: PilotTrip = {
  title: 'Rinjani sunrise plan',
  destination: 'Gunung Rinjani',
  startDate: '12 September 2026',
  endDate: '14 September 2026',
  memberCount: 4,
  syncStatus: 'synced',
};

export const pilotChecklist: readonly PilotGearItem[] = [
  { id: 'water', label: 'Air minum', category: 'Hydration', checked: true },
  { id: 'rain-jacket', label: 'Jaket hujan', category: 'Protection', checked: false },
  { id: 'headlamp', label: 'Headlamp', category: 'Safety', checked: true },
];

export const pilotItinerary: readonly PilotItineraryItem[] = [
  { id: 'basecamp', time: '06:00', title: 'Berangkat dari basecamp', location: 'Sembalun' },
  {
    id: 'viewpoint',
    time: '10:30',
    title: 'Istirahat di viewpoint',
    location: 'Plawangan Sembalun',
  },
  { id: 'sunrise', time: '05:00', title: 'Menikmati sunrise', location: 'Puncak Rinjani' },
];

export const pilotSyncStates = {
  offline: 'offline',
  conflict: 'conflict',
} as const;
