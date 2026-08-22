<script lang="ts">
  export let id = 'naira-switch';
  export let label: string;
  export let checked = false;
  export let disabled = false;
</script>

<label class="inline-flex min-h-11 items-center gap-3 text-content-primary">
  <input
    {id}
    type="checkbox"
    role="switch"
    bind:checked
    {disabled}
    class="size-5 accent-action-primary"
  />
  <span>{label}</span>
</label>
