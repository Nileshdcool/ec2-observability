// Mock ResizeObserver for Jest environment
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CostOverview from '../components/CostOverview';
import { AppProvider } from '../lib/AppContext';

describe('CostOverview', () => {
  it('renders the component and checks for main heading', () => {
    render(
      <AppProvider>
        <CostOverview />
      </AppProvider>
    );
  const heading = screen.getByRole('heading', { name: /cloud cost overview/i });
  expect(heading).toBeInTheDocument();
  });
});
