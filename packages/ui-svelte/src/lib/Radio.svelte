<script lang="ts">
  export let id = 'naira-radio';
  export let name: string;
  export let label: string;
  export let value: string;
  export let group: string | undefined = undefined;
  export let disabled = false;
</script>

<label class="inline-flex min-h-11 items-center gap-3 text-content-primary">
  <input
    {id}
    {name}
    type="radio"
    bind:group
    {value}
    {disabled}
    class="size-5 accent-action-primary"
  />
  <span>{label}</span>
</label>
