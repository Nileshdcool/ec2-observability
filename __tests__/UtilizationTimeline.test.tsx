beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
import { render, screen } from '@testing-library/react';
import UtilizationTimeline from '../components/UtilizationTimeline';
import { AppProvider } from '../lib/AppContext';

const usageData = [
  { time: '2025-08-10T00:00', cpu: 10, ram: 20 },
  { time: '2025-08-10T01:00', cpu: 15, ram: 25 }
];
const annotations = [
  { time: '2025-08-10T00:00', cpu: 10, label: 'Start' }
];

function renderWithContext(ui: React.ReactElement) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('UtilizationTimeline', () => {
  it('renders chart with usage data', () => {
    renderWithContext(<UtilizationTimeline usageData={usageData} annotations={annotations} />);
    expect(screen.getByText('Instance Utilization Timeline')).toBeInTheDocument();
    expect(screen.getByText('Selected range: 2025-08-10T00:00 to 2025-08-10T01:00')).toBeInTheDocument();
  });

  it('shows no usage data message when empty', () => {
    renderWithContext(<UtilizationTimeline usageData={[]} />);
    expect(screen.getByText('No usage data available.')).toBeInTheDocument();
  });
});
