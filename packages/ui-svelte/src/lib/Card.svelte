<script lang="ts">
  import type { Density } from './types';

  export let ariaLabel: string | undefined = undefined;
  export let tone: 'canvas' | 'subtle' | 'elevated' = 'canvas';
  export let density: Density = 'comfortable';

  const toneClasses = {
    canvas: 'bg-surface-canvas',
    subtle: 'border border-border-default bg-surface-canvas',
    elevated: 'bg-surface-elevated shadow-md',
  } as const;

  const densityClasses = {
    comfortable: 'p-4',
    compact: 'p-3',
  } as const;
</script>

<article
  class={`rounded-lg ${toneClasses[tone]} ${densityClasses[density]}`}
  role={ariaLabel ? 'region' : undefined}
  aria-label={ariaLabel}
>
  <slot />
</article>
