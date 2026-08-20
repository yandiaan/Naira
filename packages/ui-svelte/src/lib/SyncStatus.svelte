<script lang="ts">
  export let status: 'idle' | 'syncing' | 'synced' | 'conflict' = 'idle';

  const labels = {
    idle: 'Not synced',
    syncing: 'Syncing',
    synced: 'Synced',
    conflict: 'Conflict',
  } as const;
</script>

<span class={`naira-sync naira-sync--${status}`} role="status">{labels[status]}</span>

<style>
  .naira-sync {
    display: inline-flex;
    align-items: center;
    gap: var(--naira-spacing-1);
    font-size: var(--naira-typography-font-size-sm);
    font-weight: 700;
  }

  .naira-sync--synced {
    color: var(--naira-color-feedback-success);
  }

  .naira-sync--conflict {
    color: var(--naira-color-feedback-danger);
  }
</style>
