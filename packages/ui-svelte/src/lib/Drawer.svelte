<script lang="ts">
  export let open = false;
  export let title: string;
  export let description = '';

  $: titleId = 'naira-drawer-title';

  function handleKeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape') {
      open = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="fixed inset-0 z-50 bg-night-950/50" role="presentation">
    <div
      class="ml-auto flex h-full w-full max-w-md flex-col bg-surface-elevated p-6 shadow-lg"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 id={titleId} class="text-xl font-bold text-content-primary">{title}</h2>
          {#if description}<p class="mt-2 text-content-muted">{description}</p>{/if}
        </div>
        <button
          class="min-h-11 min-w-11 rounded-md text-content-muted"
          type="button"
          aria-label="Close"
          on:click={() => (open = false)}>×</button
        >
      </div>
      <div class="mt-4 flex-1 overflow-y-auto"><slot /></div>
    </div>
  </div>
{/if}
