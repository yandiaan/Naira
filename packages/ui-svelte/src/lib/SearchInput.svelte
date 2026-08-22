<script lang="ts">
  export let id = 'naira-search';
  export let label = 'Search';
  export let query = '';
  export let placeholder = '';
</script>

<div class="relative grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>{label}</label>
  <input
    {id}
    type="search"
    bind:value={query}
    {placeholder}
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 pr-20 focus:border-action-primary"
  />
  {#if query}
    <button
      class="absolute right-1 top-8 min-h-9 rounded px-2 text-sm text-action-primary"
      type="button"
      on:click={() => (query = '')}>Clear</button
    >
  {/if}
</div>
