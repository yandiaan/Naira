<script lang="ts">
  import type { TabItem } from './types';

  export let tabs: TabItem[] = [];
  export let selected: string;
</script>

<div>
  <div class="flex gap-1 border-b border-border-default" role="tablist" aria-label="Sections">
    {#each tabs as tab}
      <button
        class="min-h-11 border-b-2 px-3 font-semibold"
        class:border-action-primary={selected === tab.id}
        class:text-action-primary={selected === tab.id}
        type="button"
        role="tab"
        aria-selected={selected === tab.id}
        aria-controls={`${tab.id}-panel`}
        disabled={tab.disabled}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div id={`${selected}-panel`} role="tabpanel" tabindex="0"><slot /></div>
</div>
