<script lang="ts">
  import { AsyncState, Checkbox, Card, Progress, Text } from '@naira/ui-svelte';
  import type { PilotGearItem } from '../fixtures/planner-pilot';

  export let checklist: readonly PilotGearItem[];
  export let syncStatus: 'synced' | 'offline' | 'conflict' = 'synced';

  $: completed = checklist.filter((item) => item.checked).length;
  $: progress = checklist.length > 0 ? (completed / checklist.length) * 100 : 0;
</script>

<Card tone="canvas" ariaLabel="Gear checklist">
  <div class="flex items-start justify-between gap-4">
    <div>
      <Text as="p" size="sm" tone="brand">Gear</Text>
      <h2 class="text-xl font-bold text-content-primary">Siapkan perlengkapan</h2>
    </div>
    <Text as="p" size="sm" tone="neutral">{completed}/{checklist.length}</Text>
  </div>
  <div class="mt-4"><Progress label="Packing progress" value={progress} max={100} /></div>
  <div class="mt-4 grid gap-2">
    {#each checklist as item}
      <Checkbox label={item.label} checked={item.checked} />
    {/each}
  </div>
  <div class="mt-4"><AsyncState status={syncStatus} /></div>
</Card>
