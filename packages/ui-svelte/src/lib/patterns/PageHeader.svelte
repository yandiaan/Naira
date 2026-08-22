<script lang="ts">
  export let title: string;
  export let description = '';
</script>

<header class="flex flex-wrap items-start justify-between gap-4">
  <div>
    <h1 class="text-3xl font-bold text-content-primary">{title}</h1>
    {#if description}<p class="mt-2 max-w-2xl text-content-muted">{description}</p>{/if}
  </div>
  <div class="flex flex-wrap gap-2"><slot name="actions" /></div>
</header>
