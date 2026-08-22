<script lang="ts">
  import type { Density } from './types';

  export let id = 'naira-input';
  export let label: string;
  export let value = '';
  export let description = '';
  export let error: string | null = null;
  export let required = false;
  export let disabled = false;
  export let readonly = false;
  export let density: Density = 'comfortable';

  $: descriptionId = `${id}-description`;
  $: errorId = `${id}-error`;
  $: describedBy =
    [description ? descriptionId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;
</script>

<div class="grid gap-2" data-density={density}>
  <label class="font-semibold text-content-primary" for={id}>
    {label}
    {#if required}<span aria-hidden="true"> *</span>{/if}
  </label>

  {#if description}
    <p id={descriptionId} class="text-sm text-content-muted">{description}</p>
  {/if}

  <input
    {id}
    bind:value
    {disabled}
    {readonly}
    {required}
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 text-content-primary transition-colors duration-fast placeholder:text-content-muted focus:border-action-primary disabled:cursor-not-allowed disabled:opacity-60"
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
    aria-readonly={readonly ? 'true' : undefined}
  />

  {#if error}
    <p id={errorId} class="text-sm text-status-danger" role="alert">{error}</p>
  {/if}
</div>
