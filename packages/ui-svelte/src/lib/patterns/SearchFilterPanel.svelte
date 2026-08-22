<script lang="ts">
  export let query = '';
  export let resultSummary = '';
  export let filterCount = 0;
</script>

<section
  class="grid gap-4 rounded-lg border border-border-default bg-surface-canvas p-4"
  aria-label="Search and filters"
  data-query={query}
>
  <slot name="search" />
  <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-content-muted">
    <span>{resultSummary}</span>
    {#if filterCount > 0}<span>{filterCount} active filters</span>{/if}
  </div>
  <slot name="filters" />
</section>
