<script lang="ts">
  export let title: string;
  export let description = '';
</script>

<section class="naira-state" aria-live="polite">
  <h2>{title}</h2>
  {#if description}<p>{description}</p>{/if}
  <slot />
</section>

<style>
  .naira-state {
    display: grid;
    gap: var(--naira-spacing-2);
    border: 1px dashed var(--naira-color-border-default);
    border-radius: var(--naira-radius-lg);
    padding: var(--naira-spacing-6);
    text-align: center;
  }

  h2,
  p {
    margin: 0;
  }

  p {
    color: var(--naira-color-content-muted);
  }
</style>
