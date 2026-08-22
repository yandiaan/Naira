<script lang="ts">
  import type { ComponentTone, ControlSize } from './types';

  export let as: 'p' | 'span' | 'small' | 'div' = 'p';
  export let tone: ComponentTone = 'neutral';
  export let size: ControlSize = 'md';

  const toneClasses = {
    neutral: 'text-content-primary',
    brand: 'text-action-primary',
    success: 'text-status-success',
    warning: 'text-status-warning',
    danger: 'text-status-danger',
    info: 'text-status-info',
  } as const;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  } as const;
</script>

<svelte:element this={as} class={`${toneClasses[tone]} ${sizeClasses[size]}`}>
  <slot />
</svelte:element>
