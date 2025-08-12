import { useAppContext } from "../lib/AppContext";

export default function FilterBar({ instances }: { instances: any[] }) {
  // Extract unique values for dropdowns
  const regions = Array.from(new Set(instances.map(i => i.region)));
  const types = Array.from(new Set(instances.map(i => i.type)));
  const owners = Array.from(new Set(instances.map(i => i.owner)));
  const jobIds = Array.from(new Set(instances.map(i => i.jobId)));
  const wasteLevels = ["All", "Underused", "Over-provisioned", "OK"];

  // Context for all filters
  const { filter, setFilter, typeFilter, setTypeFilter, ownerFilter, setOwnerFilter, wasteFilter, setWasteFilter, jobIdFilter, setJobIdFilter, resetFilters } = useAppContext();

  // Simple SVG icons for context
  const icons = {
    region: <span className="mr-2">🌎</span>,
    type: <span className="mr-2">🖥️</span>,
    owner: <span className="mr-2">👤</span>,
    waste: <span className="mr-2">⚡</span>

  };

  // Helper to clear individual filters
  const clearFilter = (key: string) => {
    switch (key) {
      case 'region': setFilter(''); break;
      case 'type': setTypeFilter(''); break;
      case 'owner': setOwnerFilter(''); break;
      case 'waste': setWasteFilter('All'); break;
      case 'jobId': setJobIdFilter(''); break;
      default: break;
    }
  };

  // Collect active filters
  type ActiveFilter = { key: string; label: string };
  const activeFilters: ActiveFilter[] = [
    filter ? { key: 'region', label: `Region: ${filter}` } : undefined,
    typeFilter ? { key: 'type', label: `Type: ${typeFilter}` } : undefined,
    ownerFilter ? { key: 'owner', label: `Owner: ${ownerFilter}` } : undefined,
    wasteFilter && wasteFilter !== 'All' ? { key: 'waste', label: `Waste: ${wasteFilter}` } : undefined,
    jobIdFilter ? { key: 'jobId', label: `Job ID: ${jobIdFilter}` } : undefined,
  ].filter((f): f is ActiveFilter => !!f);

  return (
    <div
      className="mb-6 w-full bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 rounded-xl shadow-lg"
      role="region"
      aria-label="Filter controls"
    >
      {/* Active filter chips/tags */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          {activeFilters.map(f => (
            <span key={f.key} className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold shadow">
              {f.label}
              <button
                className="ml-2 text-blue-700 dark:text-blue-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
                aria-label={`Clear ${f.label}`}
                onClick={() => clearFilter(f.key)}
              >×</button>
            </span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="region-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.region}<span>Region</span></label>
          <select
            id="region-select"
            aria-label="Region filter"
            className="border border-blue-200 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="type-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.type}<span>Type</span></label>
          <select
            id="type-select"
            aria-label="Type filter"
            className="border border-blue-200 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="owner-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.owner}<span>Owner</span></label>
          <select
            id="owner-select"
            aria-label="Owner filter"
            className="border border-blue-200 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
            value={ownerFilter}
            onChange={e => setOwnerFilter(e.target.value)}
          >
            <option value="">All Owners</option>
            {owners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="waste-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.waste}<span>Waste Level</span></label>
          <select
            id="waste-select"
            aria-label="Waste level filter"
            className="border border-blue-200 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
            value={wasteFilter}
            onChange={e => setWasteFilter(e.target.value)}
          >
            {wasteLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="jobid-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">🧬<span>Job ID</span></label>
          <select
            id="jobid-select"
            aria-label="Job ID filter"
            className="border border-blue-200 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
            value={jobIdFilter}
            onChange={e => setJobIdFilter(e.target.value)}
          >
            <option value="">All Jobs</option>
            {jobIds.map(jobId => (
              <option key={jobId} value={jobId}>{jobId}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-end">
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 ${activeFilters.length > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            onClick={resetFilters}
            aria-label="Reset all filters"
          >{activeFilters.length > 0 ? 'Reset All Filters' : 'Reset Filters'}</button>
        </div>
      </div>
    </div>
  );
}
