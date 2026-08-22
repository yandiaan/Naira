<script lang="ts">
  import type { Density } from './types';

  export let tone: 'canvas' | 'subtle' | 'elevated' = 'canvas';
  export let density: Density = 'comfortable';
  export let ariaLabel: string | undefined = undefined;

  const toneClasses = {
    canvas: 'bg-surface-canvas',
    subtle: 'bg-surface-canvas border border-border-default',
    elevated: 'bg-surface-elevated shadow-md',
  } as const;

  const densityClasses = {
    comfortable: 'p-4',
    compact: 'p-3',
  } as const;
</script>

<section
  class={`rounded-lg ${toneClasses[tone]} ${densityClasses[density]}`}
  role={ariaLabel ? 'region' : undefined}
  aria-label={ariaLabel}
>
  <slot />
</section>
