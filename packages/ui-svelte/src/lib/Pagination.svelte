<script lang="ts">
  export let currentPage = 1;
  export let pageCount = 1;

  $: normalizedPageCount = Math.max(pageCount, 1);

  function goToPage(page: number) {
    currentPage = Math.min(Math.max(page, 1), normalizedPageCount);
  }
</script>

<nav aria-label="Pagination" class="flex items-center gap-2">
  <button
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    disabled={currentPage <= 1}
    aria-label="Previous page"
    data-state={currentPage <= 1 ? 'disabled' : 'idle'}
    on:click={() => goToPage(currentPage - 1)}>Previous</button
  >
  <span class="text-sm text-content-muted" aria-live="polite">
    Page {currentPage} of {normalizedPageCount}
  </span>
  <button
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    disabled={currentPage >= normalizedPageCount}
    aria-label="Next page"
    data-state={currentPage >= normalizedPageCount ? 'disabled' : 'idle'}
    on:click={() => goToPage(currentPage + 1)}>Next</button
  >
</nav>
