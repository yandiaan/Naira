<script lang="ts">
  let open = false;
</script>

<div class="menu">
  <button
    class="menu__trigger"
    type="button"
    aria-expanded={open}
    aria-controls="welcome-menu"
    aria-label="Buka menu"
    on:click={() => (open = !open)}
  >
    Menu
  </button>

  {#if open}
    <nav id="welcome-menu" aria-label="Menu publik">
      <a href="#discovery">Discovery</a>
      <a href="#main-content">Tentang Naira</a>
    </nav>
  {/if}
</div>

<style>
  .menu {
    position: relative;
  }

  .menu__trigger {
    min-height: 44px;
    border: 1px solid var(--naira-color-border-default);
    border-radius: var(--naira-radius-md);
    background: var(--naira-color-surface-default);
    padding: 0 var(--naira-spacing-3);
    color: var(--naira-color-content-default);
    font-weight: 700;
  }

  nav {
    position: absolute;
    z-index: 1;
    top: calc(100% + var(--naira-spacing-2));
    right: 0;
    display: grid;
    min-width: 10rem;
    gap: var(--naira-spacing-2);
    border: 1px solid var(--naira-color-border-default);
    border-radius: var(--naira-radius-md);
    background: var(--naira-color-surface-default);
    padding: var(--naira-spacing-3);
    box-shadow: 0 0.75rem 2rem rgb(17 24 39 / 12%);
  }

  nav a {
    padding: var(--naira-spacing-2);
    color: var(--naira-color-content-default);
    text-decoration: none;
  }
</style>
