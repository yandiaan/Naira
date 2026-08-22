<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
</script>

<div
  class={orientation === 'horizontal'
    ? 'h-px w-full bg-border-default'
    : 'h-full w-px bg-border-default'}
  role="separator"
  aria-orientation={orientation}
></div>
