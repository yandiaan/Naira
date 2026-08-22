<script lang="ts">
  export let id = 'naira-number-input';
  export let label: string;
  export let value = '';
  export let description = '';
  export let error: string | null = null;
  export let disabled = false;

  $: descriptionId = `${id}-description`;
  $: errorId = `${id}-error`;
  $: describedBy =
    [description ? descriptionId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;
</script>

<div class="grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>{label}</label>
  {#if description}<p id={descriptionId} class="text-sm text-content-muted">{description}</p>{/if}
  <input
    {id}
    type="number"
    bind:value
    {disabled}
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 text-content-primary focus:border-action-primary disabled:opacity-60"
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
  />
  {#if error}<p id={errorId} class="text-sm text-status-danger" role="alert">{error}</p>{/if}
</div>
