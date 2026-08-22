<script lang="ts">
  export let shape: 'text' | 'circle' | 'rect' = 'text';
  export let width: 'full' | 'half' | 'quarter' = 'full';
  export let height: 'sm' | 'md' | 'lg' = 'md';

  const shapeClasses = {
    text: 'rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  } as const;

  const widthClasses = {
    full: 'w-full',
    half: 'w-1/2',
    quarter: 'w-1/4',
  } as const;

  const heightClasses = {
    sm: 'h-3',
    md: 'h-5',
    lg: 'h-8',
  } as const;
</script>

<span
  class={`block animate-pulse bg-surface-canvas ${shapeClasses[shape]} ${widthClasses[width]} ${heightClasses[height]}`}
  aria-hidden="true"
></span>
