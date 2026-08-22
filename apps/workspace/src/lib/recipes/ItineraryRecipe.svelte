<script lang="ts">
  import { AsyncState, Card, Timeline } from '@naira/ui-svelte';
  import type { PilotItineraryItem } from '../fixtures/planner-pilot';

  export let itinerary: readonly PilotItineraryItem[];
  export let syncStatus: 'synced' | 'offline' | 'conflict' = 'synced';

  $: timelineItems = itinerary.map((item) => ({
    id: item.id,
    time: item.time,
    title: `${item.title} · ${item.location}`,
  }));
</script>

<Card tone="canvas" ariaLabel="Itinerary">
  <h2 class="text-xl font-bold text-content-primary">Itinerary</h2>
  <div class="mt-4"><Timeline items={timelineItems} /></div>
  <div class="mt-4"><AsyncState status={syncStatus} /></div>
</Card>
