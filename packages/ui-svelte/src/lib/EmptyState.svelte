<script lang="ts">
  export let title: string;
  export let description = '';
</script>

<section
  class="grid gap-2 rounded-lg border border-dashed border-border-strong p-6 text-center"
  aria-live="polite"
>
  <h2 class="m-0 text-lg font-semibold text-content-primary">{title}</h2>
  {#if description}<p class="m-0 text-content-muted">{description}</p>{/if}
  <slot />
</section>
