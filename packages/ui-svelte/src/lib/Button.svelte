<script lang="ts">
  import type { ControlSize, Density } from './types';

  export let label: string;
  export let ariaLabel: string | undefined = undefined;
  export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  export let size: ControlSize = 'md';
  export let density: Density = 'comfortable';
  export let disabled = false;
  export let loading = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';

  const variantClasses = {
    primary: 'bg-action-primary text-content-on-action hover:opacity-90',
    secondary:
      'border border-border-default bg-surface-elevated text-content-primary hover:bg-surface-canvas',
    ghost: 'text-action-primary hover:bg-surface-canvas',
    danger: 'bg-status-danger text-content-on-action hover:opacity-90',
  } as const;

  const sizeClasses = {
    sm: 'min-h-9 px-3 text-sm',
    md: 'min-h-11 px-4 text-base',
    lg: 'min-h-12 px-5 text-lg',
  } as const;
</script>

<button
  class={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-opacity duration-fast disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]}`}
  {type}
  disabled={disabled || loading}
  data-density={density}
  aria-busy={loading}
  aria-label={ariaLabel ?? label}
>
  {#if loading}
    <span
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    ></span>
  {/if}
  <span>{label}</span>
</button>
