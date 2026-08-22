import type { Meta, StoryObj } from '@storybook/svelte';
import Divider from '../src/lib/Divider.svelte';
import Inline from '../src/lib/Inline.svelte';
import Stack from '../src/lib/Stack.svelte';
import Surface from '../src/lib/Surface.svelte';
import VisuallyHidden from '../src/lib/VisuallyHidden.svelte';

const meta = {
  title: 'Foundations/Layout',
  component: Surface,
  tags: ['autodocs'],
} satisfies Meta<Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComfortableSurface: Story = {
  args: { tone: 'elevated', ariaLabel: 'Trip summary', density: 'comfortable' },
};

export const CompactSurface: Story = {
  args: { tone: 'subtle', ariaLabel: 'Compact data region', density: 'compact' },
};

export const Composition: Story = {
  render: () => ({
    Component: Stack,
    props: { gap: 'md' },
  }),
};

export const InlineComposition: Story = {
  render: () => ({
    Component: Inline,
    props: { gap: 'sm', wrap: true },
  }),
};

export const DividerState: Story = {
  render: () => ({ Component: Divider, props: { orientation: 'horizontal' } }),
};

export const ScreenReaderOnly: Story = {
  render: () => ({ Component: VisuallyHidden, props: { as: 'span' } }),
};
