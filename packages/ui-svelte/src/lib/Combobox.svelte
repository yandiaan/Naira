<script lang="ts">
  import type { ComboboxOption } from './types';

  export let id = 'naira-combobox';
  export let label: string;
  export let value = '';
  export let options: ComboboxOption[] = [];
  export let loading = false;
  export let description = '';
  export let error: string | null = null;
  export let disabled = false;
  export let required = false;

  let activeIndex = -1;
  let expanded = options.length > 0;

  $: listId = `${id}-list`;
  $: descriptionId = `${id}-description`;
  $: errorId = `${id}-error`;
  $: describedBy =
    [description ? descriptionId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;
  $: activeOptionId =
    activeIndex >= 0 && options[activeIndex] ? `${id}-option-${activeIndex}` : undefined;

  function selectOption(option: ComboboxOption) {
    value = option.label;
    activeIndex = options.indexOf(option);
    expanded = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (options.length === 0) {
        return;
      }

      event.preventDefault();
      expanded = true;
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      activeIndex = (activeIndex + offset + options.length) % options.length;
      return;
    }

    if (event.key === 'Enter' && expanded && activeIndex >= 0) {
      event.preventDefault();
      const activeOption = options[activeIndex];
      if (activeOption) {
        selectOption(activeOption);
      }
      return;
    }

    if (event.key === 'Escape') {
      expanded = false;
      activeIndex = -1;
    }
  }
</script>

<div class="grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>{label}</label>
  {#if description}
    <p id={descriptionId} class="text-sm text-content-muted">{description}</p>
  {/if}
  <input
    {id}
    bind:value
    {disabled}
    {required}
    role="combobox"
    aria-expanded={expanded && options.length > 0}
    aria-controls={options.length > 0 ? listId : undefined}
    aria-activedescendant={activeOptionId}
    aria-autocomplete="list"
    aria-busy={loading ? 'true' : undefined}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy}
    class="min-h-11 rounded-md border border-border-default bg-surface-elevated px-3 focus:border-action-primary disabled:opacity-60"
    on:focus={() => (expanded = options.length > 0)}
    on:input={() => {
      expanded = options.length > 0;
      activeIndex = -1;
    }}
    on:keydown={handleKeydown}
  />
  {#if loading}<p class="text-sm text-content-muted" role="status">Loading options</p>{/if}
  {#if expanded && options.length > 0}
    <ul
      id={listId}
      class="rounded-md border border-border-default bg-surface-elevated p-1"
      role="listbox"
    >
      {#each options as option, index}
        <li role="presentation">
          <button
            id={`${id}-option-${index}`}
            class="block w-full rounded px-3 py-2 text-left"
            class:bg-surface-canvas={activeIndex === index}
            type="button"
            role="option"
            aria-selected={option.label === value}
            data-state={activeIndex === index ? 'active' : 'idle'}
            on:click={() => selectOption(option)}
          >
            {option.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
  {#if error}<p id={errorId} class="text-sm text-status-danger" role="alert">{error}</p>{/if}
</div>
