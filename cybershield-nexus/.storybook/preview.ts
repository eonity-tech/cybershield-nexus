import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import './../src/index.scss';

// Initialise MSW avant que Storybook ne démarre (Indispensable pour que les requêtes soient interceptées)
initialize({
  onUnhandledRequest: "bypass", // Ignore les requêtes non mockées (images, fonts...)
});

const preview: Preview = {
  // Ajoute le loader MSW (Indispensable pour que les stories interceptent le réseau)
  loaders: [mswLoader],

  parameters: {
    backgrounds: {
      default: 'nexus-dark',
      values: [
        { name: 'nexus-dark', value: '#0f172a' },
        { name: 'light', value: '#ffffff' },
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