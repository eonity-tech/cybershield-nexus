import type { Preview } from "@storybook/react";
import './../src/index.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'nexus-dark',
      values: [
        { name: 'nexus-dark', value: '#0f172a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;