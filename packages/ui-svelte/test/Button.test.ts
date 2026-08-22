import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Button from '../src/lib/Button.svelte';

it('renders a named primary button', () => {
  render(Button, { props: { label: 'Save', variant: 'primary' } });

  expect(screen.getByRole('button', { name: 'Save' })).toBeVisible();
});

it('disables a loading button', () => {
  render(Button, { props: { label: 'Save', loading: true } });

  expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
});

it('keeps a compact large button accessible', () => {
  render(Button, { props: { label: 'Save', size: 'lg', density: 'compact' } });

  const button = screen.getByRole('button', { name: 'Save' });
  expect(button).toHaveAttribute('data-density', 'compact');
  expect(button).toHaveClass('min-h-12');
});
