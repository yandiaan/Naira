<script lang="ts">
  import type { StepItem } from './types';

  export let steps: StepItem[] = [];
</script>

<ol class="flex flex-wrap gap-4" aria-label="Progress steps">
  {#each steps as step}
    <li
      class="inline-flex items-center gap-2"
      aria-current={step.status === 'current' ? 'step' : undefined}
    >
      <span
        class="grid size-7 place-items-center rounded-full bg-action-primary text-sm font-semibold text-content-on-action"
        >{step.id}</span
      >
      <span class="text-sm text-content-primary">{step.label}</span>
    </li>
  {/each}
</ol>
