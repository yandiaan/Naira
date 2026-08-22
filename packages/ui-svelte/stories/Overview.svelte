<script lang="ts">
  const palette = [
    { name: 'Forest', token: 'action-primary', className: 'bg-action-primary' },
    { name: 'Adventure', token: 'action-accent', className: 'bg-action-accent' },
    { name: 'Cream', token: 'surface-canvas', className: 'bg-surface-canvas' },
    { name: 'Elevated', token: 'surface-elevated', className: 'bg-surface-elevated' },
    { name: 'Success', token: 'status-success', className: 'bg-status-success' },
    { name: 'Warning', token: 'status-warning', className: 'bg-status-warning' },
    { name: 'Danger', token: 'status-danger', className: 'bg-status-danger' },
    { name: 'Info', token: 'status-info', className: 'bg-status-info' },
  ];

  const categories = [
    ['Foundations', 'Tokens, typography, density, motion, iconography'],
    ['Primitives', 'Buttons, links, fields, layout, text, icons'],
    ['Feedback', 'Loading, empty, error, offline, sync, conflict'],
    ['Overlays', 'Dialog, drawer, popover, menus, tooltip'],
    ['Data display', 'Tables, lists, timeline, metrics, filters'],
    ['Patterns', 'Responsive composition and task-level building blocks'],
  ];
</script>

<main class="min-h-screen bg-surface-canvas text-content-primary">
  <section class="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
    <div class="max-w-3xl">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-action-primary">
        Naira Design System
      </p>
      <h1 class="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">
        Calm for discovery. Clear for action.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-content-muted md:text-xl">
        A custom, mobile-first system for outdoor planning, designed to feel warm in discovery and
        precise in the workspace.
      </p>
    </div>

    <section class="mt-16" aria-labelledby="palette-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-action-primary">
            Foundation
          </p>
          <h2 id="palette-title" class="mt-2 text-3xl font-bold">Canopy palette</h2>
        </div>
        <p class="max-w-md text-sm text-content-muted">
          Brand, status, and surface roles stay separate so meaning remains stable across themes.
        </p>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {#each palette as color}
          <div class="overflow-hidden rounded-xl border border-border-default bg-surface-elevated">
            <div class={`h-24 ${color.className}`}></div>
            <div class="p-3">
              <p class="font-semibold">{color.name}</p>
              <p class="mt-1 text-xs text-content-muted">{color.token}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <section class="mt-16 grid gap-6 md:grid-cols-[1.1fr_0.9fr]" aria-labelledby="type-title">
      <div class="rounded-2xl bg-action-primary p-8 text-content-on-action">
        <p class="text-sm font-semibold uppercase tracking-[0.14em] text-content-on-action/75">
          Typography
        </p>
        <h2 id="type-title" class="mt-6 text-4xl font-extrabold">Plus Jakarta Sans</h2>
        <p class="mt-4 max-w-lg text-lg text-content-on-action/80">
          Warm enough for the story. Clear enough for the checklist.
        </p>
        <div class="mt-10 space-y-3">
          <p class="text-5xl font-extrabold">Aa</p>
          <p class="text-xl font-semibold">Rencanakan dengan lebih siap.</p>
          <p class="text-sm text-content-on-action/75">
            Body 400 · Label 500/600 · Heading 600/700 · Hero 700/800
          </p>
        </div>
      </div>
      <div class="rounded-2xl border border-border-default bg-surface-elevated p-8">
        <p class="text-sm font-semibold uppercase tracking-[0.14em] text-action-primary">
          State language
        </p>
        <h2 class="mt-2 text-3xl font-bold">Make the state honest.</h2>
        <div class="mt-6 grid gap-3">
          <div class="rounded-lg bg-status-success/10 p-4">
            <p class="font-semibold text-status-success">Synced</p>
            <p class="mt-1 text-sm text-content-muted">Perubahan sudah tersimpan.</p>
          </div>
          <div class="rounded-lg bg-status-warning/10 p-4">
            <p class="font-semibold text-status-warning">Offline</p>
            <p class="mt-1 text-sm text-content-muted">Perubahan akan sync saat terhubung.</p>
          </div>
          <div class="rounded-lg bg-status-danger/10 p-4">
            <p class="font-semibold text-status-danger">Conflict</p>
            <p class="mt-1 text-sm text-content-muted">Review perubahan sebelum melanjutkan.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-16" aria-labelledby="categories-title">
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-action-primary">Catalog</p>
      <h2 id="categories-title" class="mt-2 text-3xl font-bold">A system that grows by meaning.</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each categories as category}
          <article class="rounded-xl border border-border-default bg-surface-elevated p-5">
            <h3 class="text-lg font-bold">{category[0]}</h3>
            <p class="mt-2 text-sm leading-relaxed text-content-muted">{category[1]}</p>
          </article>
        {/each}
      </div>
    </section>
  </section>
</main>
