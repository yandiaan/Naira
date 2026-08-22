<script lang="ts">
  import type { ComponentTone } from './types';

  export let tone: ComponentTone = 'info';
  export let title: string;
  export let message: string;
  export let dismissible = true;

  const toneClasses = {
    neutral: 'border-border-default bg-surface-elevated',
    brand: 'border-action-primary bg-surface-elevated',
    success: 'border-status-success bg-surface-elevated',
    warning: 'border-status-warning bg-surface-elevated',
    danger: 'border-status-danger bg-surface-elevated',
    info: 'border-status-info bg-surface-elevated',
  } as const;
</script>

<div
  class={`flex items-start justify-between gap-4 rounded-md border p-4 shadow-md ${toneClasses[tone]}`}
  role="status"
  aria-live="polite"
>
  <div>
    <strong class="text-content-primary">{title}</strong>
    <p class="text-sm text-content-muted">{message}</p>
  </div>
  {#if dismissible}
    <button
      class="min-h-11 min-w-11 rounded-md text-content-muted"
      type="button"
      aria-label="Dismiss">×</button
    >
  {/if}
</div>
