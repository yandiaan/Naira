import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../src/lib/Button.svelte';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Plan a trip',
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    label: 'Plan a trip',
    loading: true,
  },
};
