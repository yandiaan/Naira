<script lang="ts">
  export let open = false;
  export let label = 'Open popover';
</script>

<div class="relative">
  <button
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    aria-expanded={open}
    on:click={() => (open = !open)}
  >
    {label}
  </button>
  {#if open}
    <div
      class="absolute z-40 mt-2 rounded-md border border-border-default bg-surface-elevated p-4 shadow-md"
      role="dialog"
    >
      <slot />
    </div>
  {/if}
</div>
