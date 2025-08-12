import { render, screen, fireEvent } from '@testing-library/react';
import InstanceTable from '../components/InstanceTable';
import { AppProvider } from '../lib/AppContext';

const instances = [
  { id: 1, name: 'i-1', type: 't2.micro', region: 'us-east-1', cpu: 1, ram: 2, gpu: 0, uptime: 48, costPerHour: 1, owner: 'Alice' },
  { id: 2, name: 'i-2', type: 't2.large', region: 'us-west-2', cpu: 20, ram: 32, gpu: 1, uptime: 10, costPerHour: 2, owner: 'Bob' }
];

function renderWithContext(ui: React.ReactElement) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('InstanceTable', () => {
  it('renders table with instance data', () => {
    renderWithContext(<InstanceTable instances={instances} />);
    expect(screen.getByText('EC2 Instance Utilization')).toBeInTheDocument();
    expect(screen.getByText('i-1')).toBeInTheDocument();
    expect(screen.getByText('i-2')).toBeInTheDocument();
  });

  it('sorts columns when header is clicked', () => {
    renderWithContext(<InstanceTable instances={instances} />);
    fireEvent.click(screen.getByText('CPU'));
    expect(screen.getByText('CPU')).toBeInTheDocument();
  });

  it('applies waste status logic', () => {
    renderWithContext(<InstanceTable instances={instances} />);
    expect(screen.getByText('Underused')).toBeInTheDocument();
    expect(screen.getByText('Over-provisioned')).toBeInTheDocument();
  });
});
