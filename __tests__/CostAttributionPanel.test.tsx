beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
import { render, screen, fireEvent } from '@testing-library/react';
import CostAttributionPanel from '../components/CostAttributionPanel';
import { AppProvider } from '../lib/AppContext';

const attribution = [
  { dimension: 'region-1', cost: 100 },
  { dimension: 'region-2', cost: 200 }
];
const instances = [
  { region: 'region-1', type: 't2.micro', owner: 'Alice', waste: 'OK' },
  { region: 'region-2', type: 't2.large', owner: 'Bob', waste: 'Underused' }
];

function renderWithContext(ui: React.ReactElement) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('CostAttributionPanel', () => {
  it('renders table view by default', () => {
    renderWithContext(<CostAttributionPanel attribution={attribution} instances={instances} />);
    expect(screen.getByText('Cost Attribution')).toBeInTheDocument();
    expect(screen.getByText('region-1')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('switches to chart view', () => {
    renderWithContext(<CostAttributionPanel attribution={attribution} instances={instances} />);
    fireEvent.click(screen.getByTitle('Chart View'));
    expect(screen.getByText('Cost Attribution')).toBeInTheDocument();
  });

  it('shows empty state when no attribution', () => {
    renderWithContext(<CostAttributionPanel attribution={[]} instances={instances} />);
    expect(screen.getByText('No cost attribution data available.')).toBeInTheDocument();
  });
});
