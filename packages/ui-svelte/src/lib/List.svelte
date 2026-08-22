<script lang="ts">
  import type { ListItem } from './types';

  export let label: string;
  export let items: ListItem[] = [];
  export let selectedId: string | undefined = undefined;
</script>

{#if items.length === 0}
  <p class="rounded-md border border-dashed border-border-strong p-4 text-content-muted">
    No {label.toLowerCase()}
  </p>
{:else}
  <ul aria-label={label} class="divide-y divide-border-default">
    {#each items as item}
      <li class:selected={item.id === selectedId} class="p-3">
        <div class="font-semibold text-content-primary">{item.label}</div>
        {#if item.description}<p class="text-sm text-content-muted">{item.description}</p>{/if}
      </li>
    {/each}
  </ul>
{/if}
