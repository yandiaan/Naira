import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Checkbox from '../src/lib/Checkbox.svelte';
import Field from '../src/lib/Field.svelte';
import Link from '../src/lib/Link.svelte';

it('renders a checkbox with an accessible name', () => {
  render(Checkbox, { props: { label: 'Bring water', checked: false } });

  expect(screen.getByRole('checkbox', { name: 'Bring water' })).toBeVisible();
});

it('renders a required field with an associated error', () => {
  render(Field, { props: { id: 'route', label: 'Route', error: 'Choose a route' } });

  expect(screen.getByText('Choose a route')).toHaveAttribute('role', 'alert');
});

it('marks an external link for a new browsing context', () => {
  render(Link, { props: { href: 'https://example.com', external: true, label: 'Guide' } });

  expect(screen.getByRole('link', { name: 'Guide' })).toHaveAttribute('target', '_blank');
});
