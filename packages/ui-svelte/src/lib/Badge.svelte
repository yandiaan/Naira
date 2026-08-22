<script lang="ts">
  import type { ControlSize, ComponentTone } from './types';

  export let label: string;
  export let tone: ComponentTone = 'neutral';
  export let size: ControlSize = 'sm';

  const toneClasses = {
    neutral: 'bg-surface-canvas text-content-muted',
    brand: 'bg-action-primary/10 text-action-primary',
    success: 'bg-status-success/10 text-status-success',
    warning: 'bg-status-warning/10 text-status-warning',
    danger: 'bg-status-danger/10 text-status-danger',
    info: 'bg-status-info/10 text-status-info',
  } as const;

  const sizeClasses = {
    sm: 'min-h-6 px-2 text-xs',
    md: 'min-h-7 px-2.5 text-sm',
    lg: 'min-h-8 px-3 text-base',
  } as const;
</script>

<span
  class={`inline-flex items-center rounded-full font-semibold ${toneClasses[tone]} ${sizeClasses[size]}`}
>
  {label}
</span>
