<script lang="ts">
  import type { Density } from '../types';

  export let density: Density = 'comfortable';
</script>

<form class={`grid max-w-3xl gap-6 ${density === 'compact' ? 'gap-4' : ''}`} data-density={density}>
  <slot />
  <div class="flex flex-wrap gap-3"><slot name="actions" /></div>
</form>
