<script lang="ts">
  import Icon from './Icon.svelte';
  import type { ControlSize } from './types';

  export let name: 'Compass' | 'Menu';
  export let label: string;
  export let size: ControlSize = 'md';
  export let disabled = false;
  export let loading = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
  class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-action-primary transition-colors duration-fast hover:bg-surface-canvas disabled:cursor-not-allowed disabled:opacity-60"
  {type}
  {disabled}
  aria-busy={loading}
  aria-label={label}
>
  <Icon {name} {size} decorative />
</button>
