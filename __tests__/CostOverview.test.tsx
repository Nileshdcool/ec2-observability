import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CostOverview from '../components/CostOverview';
import { costOverview } from '../mock-data/costs';

describe('CostOverview', () => {
  it('renders the component and checks for main heading', () => {
    render(<CostOverview costOverview={costOverview} />);
    const heading = screen.getByRole('heading', { name: /cloud cost overview/i });
    expect(heading).toBeInTheDocument();
  });
});
