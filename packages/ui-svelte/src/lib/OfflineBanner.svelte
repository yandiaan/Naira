<script lang="ts">
  export let online = true;
</script>

{#if !online}
  <div class="naira-offline" role="status">Offline — changes will sync when you reconnect.</div>
{/if}

<style>
  .naira-offline {
    border-radius: var(--naira-radius-md);
    background: var(--naira-color-feedback-warning);
    color: var(--naira-color-surface-default);
    padding: var(--naira-spacing-2) var(--naira-spacing-3);
    font-size: var(--naira-typography-font-size-sm);
    font-weight: 700;
  }
</style>
