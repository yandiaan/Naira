<script lang="ts">
  export let title = 'Something went wrong';
  export let message = 'Try again or contact support if the problem continues.';
</script>

<section class="grid gap-2 rounded-lg border border-status-danger p-4" role="alert">
  <h2 class="m-0 text-lg font-semibold text-content-primary">{title}</h2>
  <p class="m-0 text-content-muted">{message}</p>
  <slot />
</section>
