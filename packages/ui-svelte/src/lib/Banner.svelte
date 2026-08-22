<script lang="ts">
  import type { ComponentTone } from './types';

  export let tone: ComponentTone = 'info';
  export let title: string;
  export let message: string;

  const toneClasses = {
    neutral: 'bg-surface-canvas text-content-primary',
    brand: 'bg-action-primary text-content-on-action',
    success: 'bg-status-success text-content-on-action',
    warning: 'bg-status-warning text-content-on-action',
    danger: 'bg-status-danger text-content-on-action',
    info: 'bg-status-info text-content-on-action',
  } as const;
</script>

<aside
  class={`flex flex-wrap items-center justify-between gap-3 rounded-md px-4 py-3 ${toneClasses[tone]}`}
  role="status"
  aria-live="polite"
>
  <div>
    <strong>{title}</strong>
    <p class="text-sm opacity-90">{message}</p>
  </div>
  <slot />
</aside>
