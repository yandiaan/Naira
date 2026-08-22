<script lang="ts">
  export let id: string;
  export let label: string;
  export let description = '';
  export let error: string | null = null;
  export let required = false;

  $: descriptionId = `${id}-description`;
  $: errorId = `${id}-error`;
</script>

<div class="grid gap-2">
  <label class="font-semibold text-content-primary" for={id}>
    {label}
    {#if required}<span aria-hidden="true"> *</span>{/if}
  </label>

  {#if description}
    <p id={descriptionId} class="text-sm text-content-muted">{description}</p>
  {/if}

  <slot />

  {#if error}
    <p id={errorId} class="text-sm text-status-danger" role="alert">{error}</p>
  {/if}
</div>
