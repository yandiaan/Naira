<script lang="ts">
  export let primaryLabel: string;
  export let secondaryLabel: string | undefined = undefined;
  export let destructiveLabel: string | undefined = undefined;
</script>

<div
  class="sticky bottom-0 z-20 flex flex-wrap items-center justify-end gap-2 border-t border-border-default bg-surface-elevated/95 p-3 backdrop-blur md:static md:border-0 md:bg-transparent md:p-0"
>
  {#if destructiveLabel}<button
      class="min-h-11 rounded-md px-3 font-semibold text-status-danger"
      type="button">{destructiveLabel}</button
    >{/if}
  {#if secondaryLabel}<button
      class="min-h-11 rounded-md border border-border-default px-3 font-semibold text-content-primary"
      type="button">{secondaryLabel}</button
    >{/if}
  <button
    class="min-h-11 rounded-md bg-action-primary px-4 font-semibold text-content-on-action"
    type="button">{primaryLabel}</button
  >
</div>
