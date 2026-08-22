import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Stack from '../src/lib/Stack.svelte';
import Surface from '../src/lib/Surface.svelte';
import VisuallyHidden from '../src/lib/VisuallyHidden.svelte';

it('renders an elevated surface with an accessible region name', () => {
  render(Surface, {
    props: { tone: 'elevated', ariaLabel: 'Trip summary' },
  });

  expect(screen.getByRole('region', { name: 'Trip summary' })).toHaveClass('bg-surface-elevated');
});

it('keeps visually hidden content available to assistive technology', () => {
  const { container } = render(VisuallyHidden);

  expect(container.firstElementChild).toHaveClass('sr-only');
});

it('renders a stack with the requested gap', () => {
  const { container } = render(Stack, { props: { gap: 'md' } });

  expect(container.firstElementChild).toHaveClass('gap-4');
});
