<script lang="ts">
  import type { SyncState } from './types';

  export let status: SyncState;

  const messages: Record<SyncState, string> = {
    idle: 'Not synced',
    dirty: 'Unsaved changes',
    saving: 'Saving',
    queued: 'Waiting to sync',
    syncing: 'Syncing',
    synced: 'Synced',
    offline: 'You are offline',
    'retryable-failure': 'Sync failed and can be retried',
    blocked: 'Sync is blocked',
    conflict: 'This change needs review',
  };
</script>

{#if status === 'retryable-failure'}
  <section class="grid gap-3 rounded-md border border-status-danger p-4" role="alert">
    <p class="text-content-primary">{messages[status]}</p>
    <button
      class="min-h-11 w-fit rounded-md bg-action-primary px-4 font-semibold text-content-on-action"
      type="button"
    >
      Retry
    </button>
  </section>
{:else if status === 'conflict'}
  <section class="grid gap-3 rounded-md border border-status-warning p-4" role="alert">
    <p class="text-content-primary">{messages[status]}</p>
    <button
      class="min-h-11 w-fit rounded-md bg-action-primary px-4 font-semibold text-content-on-action"
      type="button"
    >
      Resolve
    </button>
  </section>
{:else if status === 'offline'}
  <section class="rounded-md border border-status-warning p-4" role="status" aria-live="polite">
    {messages[status]}
  </section>
{:else}
  <slot />
{/if}
