<script lang="ts">
  import type { ComponentTone } from './types';

  export let href: string;
  export let label: string;
  export let external = false;
  export let tone: ComponentTone = 'brand';

  const toneClasses = {
    neutral: 'text-content-primary',
    brand: 'text-action-primary',
    success: 'text-status-success',
    warning: 'text-status-warning',
    danger: 'text-status-danger',
    info: 'text-status-info',
  } as const;
</script>

<a
  class={`font-semibold underline-offset-2 hover:underline ${toneClasses[tone]}`}
  {href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noreferrer' : undefined}
>
  {label}
  <slot />
</a>
