<script lang="ts">
  export let open = false;
  export let title: string;
  export let description = '';
  export let closeOnEscape = true;

  $: titleId = 'naira-dialog-title';
  $: descriptionId = 'naira-dialog-description';

  function handleKeydown(event: KeyboardEvent) {
    if (open && closeOnEscape && event.key === 'Escape') {
      open = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="fixed inset-0 z-50 grid place-items-center bg-night-950/50 p-4">
    <div
      class="w-full max-w-lg rounded-xl bg-surface-elevated p-6 shadow-lg"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      tabindex="-1"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 id={titleId} class="text-xl font-bold text-content-primary">{title}</h2>
          {#if description}<p id={descriptionId} class="mt-2 text-content-muted">
              {description}
            </p>{/if}
        </div>
        <button
          class="min-h-11 min-w-11 rounded-md text-content-muted"
          type="button"
          aria-label="Close"
          on:click={() => (open = false)}>×</button
        >
      </div>
      <div class="mt-4"><slot /></div>
    </div>
  </div>
{/if}
