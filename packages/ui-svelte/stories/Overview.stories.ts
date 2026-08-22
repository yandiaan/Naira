import type { Meta, StoryObj } from '@storybook/svelte';
import Overview from './Overview.svelte';

const meta = {
  title: 'Overview/Start here',
  component: Overview,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NairaSystem: Story = {};
