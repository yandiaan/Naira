<script lang="ts">
  import { tick } from 'svelte';

  export let id = 'naira-popover';
  export let open = false;
  export let label = 'Open popover';

  $: contentId = `${id}-content`;

  function handleKeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape') {
      event.preventDefault();
      open = false;
      tick().then(() => document.getElementById(id)?.focus());
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="relative">
  <button
    {id}
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls={contentId}
    data-state={open ? 'open' : 'closed'}
    on:click={() => (open = !open)}
  >
    {label}
  </button>
  {#if open}
    <div
      id={contentId}
      class="absolute z-40 mt-2 rounded-md border border-border-default bg-surface-elevated p-4 shadow-md"
      role="dialog"
      data-state="open"
    >
      <slot />
    </div>
  {/if}
</div>
