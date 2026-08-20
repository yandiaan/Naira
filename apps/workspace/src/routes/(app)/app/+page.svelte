<script lang="ts">
  import { EmptyState } from '@naira/ui-svelte';
</script>

<section class="page" aria-labelledby="planner-title">
  <p class="eyebrow">Foundation shell</p>
  <h1 id="planner-title">Planner workspace</h1>
  <p class="lead">Ruang kerja untuk menyiapkan perjalanan outdoor dengan lebih terarah.</p>
  <EmptyState
    title="Planner foundation siap"
    description="Trip, gear, itinerary, dan logistics akan masuk sebagai feature module terpisah."
  />
</section>

<style>
  .page {
    display: grid;
    gap: var(--naira-spacing-4);
  }

  h1,
  p {
    margin: 0;
  }

  h1 {
    font-size: clamp(2rem, 7vw, 4rem);
  }

  .eyebrow {
    color: var(--naira-color-action-primary);
    font-size: var(--naira-typography-font-size-sm);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .lead {
    color: var(--naira-color-content-muted);
    font-size: var(--naira-typography-font-size-lg);
  }
</style>
