<script lang="ts">
  import type { SelectOption } from './types';

  export let id = 'naira-select';
  export let label: string;
  export let options: SelectOption[] = [];
  export let value = '';
  export let disabled = false;
  export let description = '';
  export let error: string | null = null;

  $: descriptionId = `${id}-description`;
  $: errorId = `${id}-error`;
  $: describedBy =
    [description ? descriptionId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;
</script>

<div class="grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>{label}</label>
  {#if description}
    <p id={descriptionId} class="text-sm text-content-muted">{description}</p>
  {/if}
  <select
    {id}
    bind:value
    {disabled}
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 font-normal focus:border-action-primary"
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
  >
    {#each options as option}
      <option value={option.value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p id={errorId} class="text-sm text-status-danger" role="alert">{error}</p>
  {/if}
</div>
