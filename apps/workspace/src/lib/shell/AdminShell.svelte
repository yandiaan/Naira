<script lang="ts">
  export let title = 'Administration shell';
</script>

<svelte:head>
  <title>{title} · Naira</title>
</svelte:head>

<div class="shell shell--admin">
  <header class="shell__header">
    <a class="shell__brand" href="/admin" aria-label="Naira administration">Naira Admin</a>
    <nav aria-label="Administration navigation">
      <a href="/admin">Overview</a>
      <a href="/app">Planner</a>
    </nav>
  </header>

  <main class="shell__main">
    <slot />
  </main>
</div>

<style>
  .shell {
    min-height: 100vh;
    background: var(--naira-color-surface-default);
  }

  .shell__header,
  .shell__main {
    width: min(100% - 2rem, 88rem);
    margin: 0 auto;
  }

  .shell__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--naira-spacing-4);
    border-bottom: 1px solid var(--naira-color-border-default);
    padding: var(--naira-spacing-4) 0;
  }

  .shell__brand,
  nav a {
    color: var(--naira-color-content-default);
    font-weight: 800;
    text-decoration: none;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--naira-spacing-3);
  }

  .shell__main {
    padding: var(--naira-spacing-6) 0 var(--naira-spacing-8);
  }
</style>
