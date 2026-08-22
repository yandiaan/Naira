<script lang="ts">
  export let gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let wrap = true;

  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  } as const;
</script>

<div class={`flex items-center ${wrap ? 'flex-wrap' : 'flex-nowrap'} ${gapClasses[gap]}`}>
  <slot />
</div>
