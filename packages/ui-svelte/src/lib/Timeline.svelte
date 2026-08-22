<script lang="ts">
  import type { TimelineItem } from './types';

  export let items: TimelineItem[] = [];
</script>

<ol class="grid gap-4" aria-label="Timeline">
  {#each items as item}
    <li class="grid grid-cols-[auto_1fr] gap-3">
      <span class="mt-1 size-3 rounded-full bg-action-primary" aria-hidden="true"></span>
      <div>
        <time class="text-sm text-content-muted">{item.time}</time>
        <h3 class="font-semibold text-content-primary">{item.title}</h3>
      </div>
    </li>
  {/each}
</ol>
