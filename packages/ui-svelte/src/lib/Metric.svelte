<script lang="ts">
  export let label: string;
  export let value: string | number;
  export let trend: string | undefined = undefined;
  export let supportingText = '';
</script>

<section class="rounded-lg bg-surface-elevated p-4" aria-label={label}>
  <p class="text-sm text-content-muted">{label}</p>
  <p class="mt-1 text-2xl font-bold text-content-primary">{value}</p>
  {#if trend}<p class="mt-1 text-sm text-action-primary">{trend}</p>{/if}
  {#if supportingText}<p class="mt-1 text-sm text-content-muted">{supportingText}</p>{/if}
</section>
