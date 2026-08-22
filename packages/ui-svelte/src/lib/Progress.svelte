<script lang="ts">
  export let value = 0;
  export let max = 100;
  export let label: string;
  export let indeterminate = false;

  $: percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
</script>

<div class="grid gap-2">
  <div class="flex items-center justify-between gap-3 text-sm font-semibold text-content-primary">
    <span>{label}</span>
    {#if !indeterminate}<span>{Math.round(percentage)}%</span>{/if}
  </div>
  <div
    class="h-2 overflow-hidden rounded-full bg-surface-canvas"
    role="progressbar"
    aria-label={label}
    aria-valuemin="0"
    aria-valuemax={max}
    aria-valuenow={indeterminate ? undefined : value}
  >
    <div
      class={`h-full rounded-full bg-action-primary transition-[width] duration-normal ${indeterminate ? 'w-1/3 animate-pulse' : ''}`}
      style={!indeterminate ? `width: ${percentage}%` : undefined}
    ></div>
  </div>
</div>
