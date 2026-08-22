<script lang="ts">
  import { tick } from 'svelte';
  import type { TabItem } from './types';

  export let tabs: TabItem[] = [];
  export let selected: string;

  function selectTab(id: string, focus = false) {
    selected = id;
    if (focus) {
      tick().then(() => document.getElementById(`${id}-tab`)?.focus());
    }
  }

  function handleKeydown(event: KeyboardEvent, index: number) {
    const enabledIndexes = tabs
      .map((tab, tabIndex) => (tab.disabled ? -1 : tabIndex))
      .filter((tabIndex) => tabIndex >= 0);

    if (enabledIndexes.length === 0) {
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? enabledIndexes[0] : enabledIndexes.at(-1);
      const nextTab = nextIndex === undefined ? undefined : tabs[nextIndex];
      if (nextTab) {
        selectTab(nextTab.id, true);
      }
      return;
    }

    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();
    const currentPosition = enabledIndexes.indexOf(index);
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextPosition = (currentPosition + offset + enabledIndexes.length) % enabledIndexes.length;
    const nextIndex = enabledIndexes[nextPosition];
    const nextTab = nextIndex === undefined ? undefined : tabs[nextIndex];
    if (nextTab) {
      selectTab(nextTab.id, true);
    }
  }
</script>

<div>
  <div
    class="flex gap-1 border-b border-border-default"
    role="tablist"
    aria-label="Sections"
    aria-orientation="horizontal"
  >
    {#each tabs as tab, index}
      <button
        id={`${tab.id}-tab`}
        class="min-h-11 border-b-2 px-3 font-semibold"
        class:border-action-primary={selected === tab.id}
        class:text-action-primary={selected === tab.id}
        type="button"
        role="tab"
        aria-selected={selected === tab.id}
        aria-controls={`${tab.id}-panel`}
        tabindex={selected === tab.id ? 0 : -1}
        data-state={selected === tab.id ? 'active' : 'inactive'}
        disabled={tab.disabled}
        on:click={() => selectTab(tab.id)}
        on:keydown={(event) => handleKeydown(event, index)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div id={`${selected}-panel`} role="tabpanel" aria-labelledby={`${selected}-tab`} tabindex="0">
    <slot />
  </div>
</div>
