<script lang="ts">
  import type { BreadcrumbItem } from './types';

  export let items: BreadcrumbItem[] = [];
</script>

<nav aria-label="Breadcrumb">
  <ol class="flex flex-wrap items-center gap-2 text-sm text-content-muted">
    {#each items as item, index}
      <li class="inline-flex items-center gap-2">
        {#if item.href && index < items.length - 1}<a
            href={item.href}
            class="text-action-primary hover:underline">{item.label}</a
          >{:else}<span aria-current={index === items.length - 1 ? 'page' : undefined}
            >{item.label}</span
          >{/if}
        {#if index < items.length - 1}<span aria-hidden="true">/</span>{/if}
      </li>
    {/each}
  </ol>
</nav>
