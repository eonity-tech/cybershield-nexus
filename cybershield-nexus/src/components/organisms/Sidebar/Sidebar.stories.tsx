import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './Sidebar';
import { AuthContext } from '../../../services/auth/AuthContext';

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      // On entoure la sidebar d'un faux Provider pour Storybook
      <AuthContext.Provider value={{ 
        username: 'Analyste_Nexus_01', 
        logout: () => alert('Logout clicked'),
        isAuthenticated: true 
      } as any}>
        <div style={{ width: '260px' }}><Story /></div>
      </AuthContext.Provider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};