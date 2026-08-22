<script lang="ts">
  export let filterCount = 0;
</script>

<form
  class="flex flex-wrap items-end gap-3 rounded-lg border border-border-default bg-surface-canvas p-3"
  aria-label="Filters"
>
  <slot />
  {#if filterCount > 0}
    <button class="min-h-11 rounded-md px-3 font-semibold text-action-primary" type="reset"
      >Clear {filterCount} filters</button
    >
  {/if}
</form>
