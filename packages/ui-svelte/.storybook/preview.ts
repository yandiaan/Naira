import type { Preview } from '@storybook/svelte';
import '../src/styles.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Naira color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: ['light', 'dark'],
      },
    },
    density: {
      description: 'Naira interaction density',
      defaultValue: 'comfortable',
      toolbar: {
        icon: 'component',
        items: ['comfortable', 'compact'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme ?? 'light';
      document.documentElement.dataset.density = context.globals.density ?? 'comfortable';
      return Story();
    },
  ],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#FAF8F1' },
        { name: 'night', value: '#121A16' },
      ],
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/iu,
        date: /Date$/u,
      },
    },
  },
};

export default preview;
