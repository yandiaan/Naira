<script lang="ts">
  import type { ComboboxOption } from './types';

  export let id = 'naira-combobox';
  export let label: string;
  export let value = '';
  export let options: ComboboxOption[] = [];
  export let loading = false;

  $: listId = `${id}-list`;
</script>

<div class="grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>{label}</label>
  <input
    {id}
    bind:value
    role="combobox"
    aria-expanded={options.length > 0}
    aria-controls={listId}
    aria-autocomplete="list"
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 focus:border-action-primary"
  />
  {#if loading}<p class="text-sm text-content-muted" role="status">Loading options</p>{/if}
  {#if options.length > 0}
    <ul
      id={listId}
      class="rounded-md border border-border-default bg-surface-elevated p-1"
      role="listbox"
    >
      {#each options as option}
        <li class="rounded px-3 py-2" role="option" aria-selected={option.value === value}>
          {option.label}
        </li>
      {/each}
    </ul>
  {/if}
</div>
