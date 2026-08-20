<script lang="ts">
  export let id = 'naira-input';
  export let label: string;
  export let value = '';
  export let error: string | null = null;
  export let disabled = false;
</script>

<div class="naira-field">
  <label for={id}>{label}</label>
  <input
    {id}
    bind:value
    {disabled}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${id}-error` : undefined}
  />
  {#if error}
    <p id={`${id}-error`} class="naira-field__error" role="alert">{error}</p>
  {/if}
</div>

<style>
  .naira-field {
    display: grid;
    gap: var(--naira-spacing-2);
  }

  label {
    color: var(--naira-color-content-default);
    font-weight: 700;
  }

  input {
    min-height: 44px;
    border: 1px solid var(--naira-color-border-default);
    border-radius: var(--naira-radius-md);
    padding: 0 var(--naira-spacing-3);
    color: var(--naira-color-content-default);
  }

  input[aria-invalid='true'] {
    border-color: var(--naira-color-feedback-danger);
  }

  .naira-field__error {
    margin: 0;
    color: var(--naira-color-feedback-danger);
    font-size: var(--naira-typography-font-size-sm);
  }
</style>
