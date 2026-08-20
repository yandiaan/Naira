import type { Meta, StoryObj } from '@storybook/svelte';
import ErrorState from '../src/lib/ErrorState.svelte';

const meta = {
  title: 'Primitives/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
} satisfies Meta<ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
