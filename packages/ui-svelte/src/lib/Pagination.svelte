<script lang="ts">
  export let currentPage = 1;
  export let pageCount = 1;
</script>

<nav aria-label="Pagination" class="flex items-center gap-2">
  <button
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    disabled={currentPage <= 1}
    aria-label="Previous page">Previous</button
  >
  <span class="text-sm text-content-muted">Page {currentPage} of {pageCount}</span>
  <button
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    disabled={currentPage >= pageCount}
    aria-label="Next page">Next</button
  >
</nav>
