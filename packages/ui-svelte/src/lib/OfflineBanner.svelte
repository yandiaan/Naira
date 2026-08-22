<script lang="ts">
  export let online = true;
  export let message = 'Offline — changes will sync when you reconnect.';
</script>

{#if !online}
  <div
    class="rounded-md bg-status-warning px-3 py-2 text-sm font-semibold text-content-on-action"
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
{/if}
