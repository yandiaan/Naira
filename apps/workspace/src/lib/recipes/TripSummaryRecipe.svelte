<script lang="ts">
  import { Badge, Card, Heading, SyncStatus, Text } from '@naira/ui-svelte';
  import type { PilotTrip } from '../fixtures/planner-pilot';

  export let trip: PilotTrip;
</script>

<Card tone="elevated" ariaLabel="Trip summary">
  <div class="flex flex-wrap items-start justify-between gap-4">
    <div>
      <Text as="p" size="sm" tone="brand">Upcoming trip</Text>
      <Heading level={1} size="lg">{trip.title}</Heading>
      <Text as="p" tone="neutral">{trip.destination} · {trip.startDate} - {trip.endDate}</Text>
    </div>
    <SyncStatus status={trip.syncStatus} />
  </div>
  <div class="mt-4 flex flex-wrap gap-2">
    <Badge label={`${trip.memberCount} members`} tone="brand" />
    <Badge label="Planning" tone="neutral" />
  </div>
</Card>
