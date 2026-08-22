<script lang="ts">
  import type { SelectOption } from './types';

  export let id = 'naira-select';
  export let label: string;
  export let options: SelectOption[] = [];
  export let value = '';
  export let disabled = false;
</script>

<label class="grid gap-2 font-semibold text-content-primary" for={id}>
  {label}
  <select
    {id}
    bind:value
    {disabled}
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 font-normal focus:border-action-primary"
  >
    {#each options as option}
      <option value={option.value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>
</label>
