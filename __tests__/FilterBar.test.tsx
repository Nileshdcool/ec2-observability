import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';
import { AppContext } from '../lib/AppContext';

const instances = [
  { region: 'us-east-1', type: 't2.micro', owner: 'Alice' },
  { region: 'us-west-2', type: 't2.large', owner: 'Bob' }
];

const contextValue = {
  filter: '', setFilter: jest.fn(),
  typeFilter: '', setTypeFilter: jest.fn(),
  ownerFilter: '', setOwnerFilter: jest.fn(),
  wasteFilter: 'All', setWasteFilter: jest.fn(),
  jobIdFilter: '', setJobIdFilter: jest.fn(),
  resetFilters: jest.fn()
};

function renderWithContext(ui: React.ReactElement) {
  return render(
    <AppContext.Provider value={contextValue}>
      {ui}
    </AppContext.Provider>
  );
}

describe('FilterBar', () => {
  it('renders all filter dropdowns', () => {
    renderWithContext(<FilterBar instances={instances} />);
  expect(screen.getByRole('combobox', { name: /Region filter/ })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /Type filter/ })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /Owner filter/ })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /Waste level filter/i })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /Job ID filter/i })).toBeInTheDocument();
  });

  it('calls context setters on change', () => {
    renderWithContext(<FilterBar instances={instances} />);
  fireEvent.change(screen.getByRole('combobox', { name: /Region filter/ }), { target: { value: 'us-east-1' } });
  fireEvent.change(screen.getByRole('combobox', { name: /Type filter/ }), { target: { value: 't2.micro' } });
  fireEvent.change(screen.getByRole('combobox', { name: /Owner filter/ }), { target: { value: 'Alice' } });
  fireEvent.change(screen.getByRole('combobox', { name: /Waste level filter/i }), { target: { value: 'Underused' } });
    expect(contextValue.setFilter).toHaveBeenCalled();
    expect(contextValue.setTypeFilter).toHaveBeenCalled();
    expect(contextValue.setOwnerFilter).toHaveBeenCalled();
    expect(contextValue.setWasteFilter).toHaveBeenCalled();
  });
});
