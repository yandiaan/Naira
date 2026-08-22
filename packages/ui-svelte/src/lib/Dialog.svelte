<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { getFocusableElements } from './focus';

  export let open = false;
  export let title: string;
  export let description = '';
  export let closeOnEscape = true;

  let dialogElement: HTMLDivElement;
  let initialFocusElement: HTMLButtonElement;
  let wasOpen = false;
  let returnFocusElement: HTMLElement | null = null;

  $: titleId = 'naira-dialog-title';
  $: descriptionId = 'naira-dialog-description';

  afterUpdate(() => {
    if (open && !wasOpen) {
      wasOpen = true;
      returnFocusElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      initialFocusElement?.focus();
    }

    if (!open && wasOpen) {
      wasOpen = false;
      returnFocusElement?.focus();
      returnFocusElement = null;
    }
  });

  function handleKeydown(event: KeyboardEvent) {
    if (open && closeOnEscape && event.key === 'Escape') {
      open = false;
    }
  }

  function handleDialogKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(dialogElement);
    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogElement.focus();
      return;
    }

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && currentIndex <= 0) {
      event.preventDefault();
      lastElement?.focus();
    }

    if (!event.shiftKey && (currentIndex === -1 || currentIndex === focusableElements.length - 1)) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="fixed inset-0 z-50 grid place-items-center bg-night-950/50 p-4">
    <div
      bind:this={dialogElement}
      class="w-full max-w-lg rounded-xl bg-surface-elevated p-6 shadow-lg"
      role="dialog"
      data-state="open"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      tabindex="-1"
      on:keydown={handleDialogKeydown}
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 id={titleId} class="text-xl font-bold text-content-primary">{title}</h2>
          {#if description}<p id={descriptionId} class="mt-2 text-content-muted">
              {description}
            </p>{/if}
        </div>
        <button
          class="min-h-11 min-w-11 rounded-md text-content-muted"
          type="button"
          aria-label="Close"
          bind:this={initialFocusElement}
          on:click={() => (open = false)}>×</button
        >
      </div>
      <div class="mt-4"><slot /></div>
    </div>
  </div>
{/if}
