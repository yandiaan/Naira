<script lang="ts">
  export let as: 'span' | 'div' = 'span';
</script>

<svelte:element this={as} class="sr-only">
  <slot />
</svelte:element>
