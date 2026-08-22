<script lang="ts">
  import type { AccordionItem } from './types';

  export let items: AccordionItem[] = [];
</script>

<div class="divide-y divide-border-default">
  {#each items as item}
    <details class="py-3">
      <summary class="cursor-pointer font-semibold text-content-primary">{item.title}</summary>
      <p class="mt-2 text-content-muted">{item.content}</p>
    </details>
  {/each}
</div>
