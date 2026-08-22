<script lang="ts">
  import { tick } from 'svelte';
  import type { MenuItem } from './types';

  export let id = 'naira-menu';
  export let open = false;
  export let label = 'Open menu';
  export let items: MenuItem[] = [];

  let triggerElement: HTMLButtonElement;
  let menuElement: HTMLUListElement;

  $: menuId = `${id}-list`;

  function getMenuItems(): HTMLButtonElement[] {
    return Array.from(
      menuElement?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [],
    ).filter((item) => !item.disabled);
  }

  function focusMenuItem(index: number) {
    tick().then(() => getMenuItems()[index]?.focus());
  }

  function openMenu(focusFirst = false) {
    open = true;
    if (focusFirst) {
      focusMenuItem(0);
    }
  }

  function closeMenu(returnFocus = false) {
    open = false;
    if (returnFocus) {
      tick().then(() => triggerElement?.focus());
    }
  }

  function toggleMenu() {
    if (open) {
      closeMenu();
      return;
    }

    openMenu();
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu(true);
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      closeMenu(true);
    }
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    const menuItems = getMenuItems();
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + offset + menuItems.length) % menuItems.length;
      menuItems[nextIndex]?.focus();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      menuItems[0]?.focus();
    }

    if (event.key === 'End') {
      event.preventDefault();
      menuItems[menuItems.length - 1]?.focus();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    }
  }
</script>

<div class="relative inline-block">
  <button
    bind:this={triggerElement}
    class="min-h-11 rounded-md border border-border-default px-3"
    type="button"
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls={menuId}
    data-state={open ? 'open' : 'closed'}
    on:click={toggleMenu}
    on:keydown={handleTriggerKeydown}
  >
    {label}
  </button>
  {#if open}
    <ul
      bind:this={menuElement}
      id={menuId}
      class="absolute right-0 z-40 mt-2 min-w-48 rounded-md border border-border-default bg-surface-elevated p-1 shadow-md"
      role="menu"
      data-state="open"
      on:keydown={handleMenuKeydown}
    >
      {#each items as item}
        <li role="none">
          <button
            class="w-full rounded px-3 py-2 text-left hover:bg-surface-canvas disabled:opacity-60"
            type="button"
            role="menuitem"
            disabled={item.disabled}
            on:click={() => closeMenu()}>{item.label}</button
          >
        </li>
      {/each}
    </ul>
  {/if}
</div>
