<script lang="ts">
  import { EmptyState } from '@naira/ui-svelte';
</script>

<section class="page" aria-labelledby="admin-title">
  <p class="eyebrow">Foundation shell</p>
  <h1 id="admin-title">Administration shell</h1>
  <p class="lead">
    Area operasional untuk mengelola platform tanpa mencampur route planner pengguna.
  </p>
  <EmptyState
    title="Admin foundation siap"
    description="Operational modules akan ditambahkan setelah authorization policy disiapkan."
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
