<script lang="ts">
  import type { ControlSize } from './types';

  export let label = 'Loading';
  export let size: ControlSize = 'md';

  const sizeClasses = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  } as const;
</script>

<span class="inline-flex items-center gap-2 text-content-muted" role="status" aria-label={label}>
  <span
    class={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]}`}
    aria-hidden="true"
  ></span>
  <span class="sr-only">{label}</span>
</span>
