<script lang="ts">
  export let label: string;
</script>

<span class="relative inline-flex" title={label}>
  <slot />
  <span class="sr-only">{label}</span>
</span>
