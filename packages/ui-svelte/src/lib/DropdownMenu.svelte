<script lang="ts">
  import type { MenuItem } from './types';

  export let open = false;
  export let label = 'Open menu';
  export let items: MenuItem[] = [];
</script>

<div class="relative inline-block">
  <button
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    aria-haspopup="menu"
    aria-expanded={open}
    on:click={() => (open = !open)}
  >
    {label}
  </button>
  {#if open}
    <ul
      class="absolute right-0 z-40 mt-2 min-w-48 rounded-md border border-border-default bg-surface-elevated p-1 shadow-md"
      role="menu"
    >
      {#each items as item}
        <li role="none">
          <button
            class="w-full rounded px-3 py-2 text-left hover:bg-surface-canvas disabled:opacity-60"
            type="button"
            role="menuitem"
            disabled={item.disabled}>{item.label}</button
          >
        </li>
      {/each}
    </ul>
  {/if}
</div>
