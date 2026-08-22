<script lang="ts">
  export let id = 'naira-checkbox';
  export let label: string;
  export let checked = false;
  export let disabled = false;
  export let required = false;
</script>

<label class="inline-flex min-h-11 items-center gap-3 text-content-primary">
  <input
    {id}
    type="checkbox"
    bind:checked
    {disabled}
    {required}
    class="size-5 accent-action-primary"
  />
  <span>{label}</span>
</label>
