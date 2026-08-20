<script lang="ts">
  export let title = 'Something went wrong';
  export let message = 'Try again or contact support if the problem continues.';
</script>

<section class="naira-error" role="alert">
  <h2>{title}</h2>
  <p>{message}</p>
  <slot />
</section>

<style>
  .naira-error {
    display: grid;
    gap: var(--naira-spacing-2);
    border: 1px solid var(--naira-color-feedback-danger);
    border-radius: var(--naira-radius-lg);
    padding: var(--naira-spacing-4);
  }

  h2,
  p {
    margin: 0;
  }
</style>
