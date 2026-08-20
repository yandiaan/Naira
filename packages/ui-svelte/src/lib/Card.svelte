<script lang="ts">
  export let ariaLabel: string | undefined = undefined;
</script>

<article class="naira-card" aria-label={ariaLabel}>
  <slot />
</article>

<style>
  .naira-card {
    border: 1px solid var(--naira-color-border-default);
    border-radius: var(--naira-radius-lg);
    background: var(--naira-color-surface-default);
    padding: var(--naira-spacing-4);
  }
</style>
