<script lang="ts">
  export let level: 1 | 2 | 3 | 4 = 2;
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  $: headingTag = `h${level}`;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  } as const;
</script>

<svelte:element this={headingTag} class={`font-bold text-content-primary ${sizeClasses[size]}`}>
  <slot />
</svelte:element>
