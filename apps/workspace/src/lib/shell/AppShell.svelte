<script lang="ts">
  export let title = 'Planner workspace';
</script>

<svelte:head>
  <title>{title} · Naira</title>
</svelte:head>

<div class="min-h-screen bg-surface-canvas" data-density="comfortable" data-shell="app">
  <header class="mx-auto flex w-[min(100%-2rem,80rem)] items-center justify-between gap-4 py-4">
    <a class="font-extrabold text-content-primary" href="/app" aria-label="Naira planner workspace"
      >Naira</a
    >
    <nav class="hidden items-center gap-4 md:flex" aria-label="Planner navigation">
      <a class="font-semibold text-action-primary hover:underline" href="/app">Planner</a>
      <a class="font-semibold text-content-muted hover:text-content-primary" href="/admin">Admin</a>
    </nav>
  </header>

  <nav
    class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-border-default bg-surface-elevated p-2 md:hidden"
    aria-label="Planner mobile navigation"
  >
    <a class="rounded-md px-3 py-3 text-center font-semibold text-action-primary" href="/app"
      >Planner</a
    >
    <a class="rounded-md px-3 py-3 text-center font-semibold text-content-muted" href="/admin"
      >Admin</a
    >
  </nav>

  <main class="mx-auto w-[min(100%-2rem,80rem)] pb-24 pt-6 md:pb-12">
    <slot />
  </main>
</div>
