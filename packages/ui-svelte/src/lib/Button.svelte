<script lang="ts">
  export let label: string;
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let disabled = false;
  export let loading = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
  class={`naira-button naira-button--${variant}`}
  {type}
  disabled={disabled || loading}
  aria-busy={loading}
  aria-label={label}
>
  <span>{loading ? 'Loading…' : label}</span>
</button>

<style>
  .naira-button {
    min-height: 44px;
    border: 1px solid transparent;
    border-radius: var(--naira-radius-md);
    padding: 0 var(--naira-spacing-4);
    cursor: pointer;
    font-weight: 700;
    transition: background-color var(--naira-motion-duration-fast) ease;
  }

  .naira-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .naira-button--primary {
    background: var(--naira-color-action-primary);
    color: var(--naira-color-surface-default);
  }

  .naira-button--secondary {
    border-color: var(--naira-color-border-default);
    background: var(--naira-color-surface-default);
    color: var(--naira-color-content-default);
  }

  .naira-button--ghost {
    background: transparent;
    color: var(--naira-color-action-primary);
  }
</style>
