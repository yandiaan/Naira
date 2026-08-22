<script lang="ts">
  import type { ComponentTone } from './types';

  export let tone: ComponentTone = 'info';
  export let title: string;
  export let message: string;

  const toneClasses = {
    neutral: 'border-border-default bg-surface-canvas',
    brand: 'border-action-primary bg-action-primary/10',
    success: 'border-status-success bg-status-success/10',
    warning: 'border-status-warning bg-status-warning/10',
    danger: 'border-status-danger bg-status-danger/10',
    info: 'border-status-info bg-status-info/10',
  } as const;

  $: role = tone === 'danger' ? 'alert' : 'status';
</script>

<section class={`grid gap-2 rounded-md border p-4 ${toneClasses[tone]}`} {role} aria-live="polite">
  <h2 class="font-semibold text-content-primary">{title}</h2>
  <p class="text-content-muted">{message}</p>
  <slot />
</section>
