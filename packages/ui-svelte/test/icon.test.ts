import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Icon from '../src/lib/Icon.svelte';
import IconButton from '../src/lib/IconButton.svelte';

it('hides a decorative icon from assistive technology', () => {
  render(Icon, { props: { name: 'Compass', decorative: true } });

  expect(screen.getByTestId('naira-icon')).toHaveAttribute('aria-hidden', 'true');
});

it('requires an accessible name for an icon button', () => {
  render(IconButton, { props: { label: 'Open menu', name: 'Menu' } });

  expect(screen.getByRole('button', { name: 'Open menu' })).toBeVisible();
});
