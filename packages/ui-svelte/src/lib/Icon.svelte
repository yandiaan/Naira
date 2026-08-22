<script lang="ts">
  import Compass from '@lucide/svelte/icons/compass';
  import Menu from '@lucide/svelte/icons/menu';

  import type { ControlSize } from './types';

  export let name: 'Compass' | 'Menu';
  export let size: ControlSize = 'md';
  export let label: string | undefined = undefined;
  export let decorative = false;

  const iconMap = {
    Compass,
    Menu,
  } as const;

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  } as const;
</script>

<svelte:component
  this={iconMap[name]}
  size={iconSizes[size]}
  strokeWidth={2}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={decorative ? undefined : label}
  data-testid="naira-icon"
/>
