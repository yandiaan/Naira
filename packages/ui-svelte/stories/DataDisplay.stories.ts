import type { Meta, StoryObj } from '@storybook/svelte';
import FilterBar from '../src/lib/FilterBar.svelte';
import List from '../src/lib/List.svelte';
import Metric from '../src/lib/Metric.svelte';
import SearchInput from '../src/lib/SearchInput.svelte';
import Table from '../src/lib/Table.svelte';
import Timeline from '../src/lib/Timeline.svelte';

const meta = {
  title: 'Components/Data Display',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GearTable: Story = {
  args: {
    caption: 'Gear list',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { name: 'Water', status: 'Ready' },
      { name: 'Rain jacket', status: 'Missing' },
    ],
  },
};

export const EmptyTable: Story = {
  args: { caption: 'Empty gear list', columns: [{ key: 'name', label: 'Name' }], rows: [] },
};

export const EmptyList: Story = {
  render: () => ({ Component: List, props: { label: 'Trips', items: [] } }),
};

export const TripMetric: Story = {
  render: () => ({
    Component: Metric,
    props: { label: 'Packing progress', value: '72%', trend: '+8%' },
  }),
};

export const TripTimeline: Story = {
  render: () => ({
    Component: Timeline,
    props: {
      items: [
        { id: 'start', time: '06:00', title: 'Start from basecamp' },
        { id: 'summit', time: '10:30', title: 'Reach viewpoint' },
      ],
    },
  }),
};

export const SearchAndFilters: Story = {
  render: () => ({ Component: SearchInput, props: { label: 'Search trips', query: 'Rinjani' } }),
};

export const Filters: Story = {
  render: () => ({ Component: FilterBar, props: { filterCount: 2 } }),
};
