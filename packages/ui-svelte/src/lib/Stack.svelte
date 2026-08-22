<script lang="ts">
  import type { Density } from './types';

  export let gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let density: Density = 'comfortable';

  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  } as const;

  const densityClasses = {
    comfortable: '',
    compact: 'density-compact',
  } as const;
</script>

<div class={`flex flex-col ${gapClasses[gap]} ${densityClasses[density]}`}>
  <slot />
</div>
