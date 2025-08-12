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

  return (
    <div
      className="mb-6 w-full bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 rounded-xl shadow-lg"
      role="region"
      aria-label="Filter controls"
    >
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
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700"
            onClick={resetFilters}
            aria-label="Reset all filters"
          >Reset Filters</button>
        </div>
      </div>
    </div>
  );
}
