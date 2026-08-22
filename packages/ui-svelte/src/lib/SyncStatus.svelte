<script lang="ts">
  import type { SyncState } from './types';

  export let status: SyncState = 'idle';

  const labels: Record<SyncState, string> = {
    idle: 'Not synced',
    dirty: 'Unsaved changes',
    saving: 'Saving',
    queued: 'Waiting to sync',
    syncing: 'Syncing',
    synced: 'Synced',
    offline: 'Offline',
    'retryable-failure': 'Retry sync',
    blocked: 'Sync blocked',
    conflict: 'Conflict',
  };

  const toneClasses: Record<SyncState, string> = {
    idle: 'text-content-muted',
    dirty: 'text-status-warning',
    saving: 'text-action-primary',
    queued: 'text-status-warning',
    syncing: 'text-action-primary',
    synced: 'text-status-success',
    offline: 'text-status-warning',
    'retryable-failure': 'text-status-danger',
    blocked: 'text-status-danger',
    conflict: 'text-status-danger',
  };
</script>

<span
  class={`inline-flex items-center gap-1 text-sm font-semibold ${toneClasses[status]}`}
  role="status"
  aria-live="polite"
>
  {labels[status]}
</span>
