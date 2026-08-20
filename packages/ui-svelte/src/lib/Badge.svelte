<script lang="ts">
  export let label: string;
  export let tone: 'neutral' | 'success' | 'danger' | 'warning' = 'neutral';
</script>

<span class={`naira-badge naira-badge--${tone}`}>{label}</span>

<style>
  .naira-badge {
    display: inline-flex;
    min-height: 24px;
    align-items: center;
    border-radius: var(--naira-radius-full);
    padding: 0 var(--naira-spacing-2);
    font-size: var(--naira-typography-font-size-sm);
    font-weight: 700;
  }

  .naira-badge--neutral {
    background: var(--naira-color-surface-subtle);
    color: var(--naira-color-content-muted);
  }

  .naira-badge--success {
    background: color-mix(in srgb, var(--naira-color-feedback-success) 14%, white);
    color: var(--naira-color-feedback-success);
  }

  .naira-badge--danger {
    background: color-mix(in srgb, var(--naira-color-feedback-danger) 14%, white);
    color: var(--naira-color-feedback-danger);
  }

  .naira-badge--warning {
    background: color-mix(in srgb, var(--naira-color-feedback-warning) 14%, white);
    color: var(--naira-color-feedback-warning);
  }
</style>
