<script lang="ts">
  export let id = 'naira-textarea';
  export let label: string;
  export let value = '';
  export let description = '';
  export let error: string | null = null;
  export let required = false;
  export let disabled = false;

  $: descriptionId = `${id}-description`;
  $: errorId = `${id}-error`;
  $: describedBy =
    [description ? descriptionId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;
</script>

<div class="grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>{label}</label>
  {#if description}<p id={descriptionId} class="text-sm text-content-muted">{description}</p>{/if}
  <textarea
    {id}
    bind:value
    {disabled}
    {required}
    class="min-h-28 rounded-md border border-border-default bg-surface-elevated p-3 text-content-primary focus:border-action-primary disabled:opacity-60"
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}></textarea>
  {#if error}<p id={errorId} class="text-sm text-status-danger" role="alert">{error}</p>{/if}
</div>
