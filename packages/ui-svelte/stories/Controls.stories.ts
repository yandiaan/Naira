import type { Meta, StoryObj } from '@storybook/svelte';
import Checkbox from '../src/lib/Checkbox.svelte';
import IconButton from '../src/lib/IconButton.svelte';
import Link from '../src/lib/Link.svelte';
import Select from '../src/lib/Select.svelte';
import Textarea from '../src/lib/Textarea.svelte';

const meta = {
  title: 'Components/Controls',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxDefault: Story = {
  args: { label: 'Bring water', checked: false },
};

export const CheckboxDisabled: Story = {
  args: { label: 'Route confirmed', checked: true, disabled: true },
};

export const TextareaError: Story = {
  render: () => ({
    Component: Textarea,
    props: {
      label: 'Trip notes',
      description: 'Add a note for your group',
      error: 'Notes are required',
    },
  }),
};

export const SelectOptions: Story = {
  render: () => ({
    Component: Select,
    props: {
      label: 'Difficulty',
      options: [
        { value: 'easy', label: 'Easy' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'hard', label: 'Hard' },
      ],
      value: 'moderate',
    },
  }),
};

export const ExternalLink: Story = {
  render: () => ({
    Component: Link,
    props: { href: 'https://example.com', label: 'Trail guide', external: true },
  }),
};

export const MenuIconButton: Story = {
  render: () => ({ Component: IconButton, props: { name: 'Menu', label: 'Open menu' } }),
};
