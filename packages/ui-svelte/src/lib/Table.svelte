<script lang="ts">
  import type { Density, TableColumn, TableRow } from './types';

  export let caption: string;
  export let columns: TableColumn[] = [];
  export let rows: TableRow[] = [];
  export let loading = false;
  export let density: Density = 'comfortable';
</script>

<div class="overflow-x-auto" data-density={density}>
  <table class="min-w-full border-collapse text-left" aria-busy={loading}>
    <caption class="sr-only">{caption}</caption>
    <thead>
      <tr class="border-b border-border-default text-sm text-content-muted">
        {#each columns as column}<th class="px-3 py-2 font-semibold" scope="col">{column.label}</th
          >{/each}
      </tr>
    </thead>
    <tbody>
      {#if loading}
        <tr><td class="px-3 py-4 text-content-muted" colspan={columns.length || 1}>Loading</td></tr>
      {:else if rows.length === 0}
        <tr><td class="px-3 py-4 text-content-muted" colspan={columns.length || 1}>No data</td></tr>
      {:else}
        {#each rows as row}
          <tr class="border-b border-border-default last:border-0">
            {#each columns as column}<td class="px-3 py-3 text-content-primary"
                >{row[column.key]}</td
              >{/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
