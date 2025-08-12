import { useAppContext } from "../lib/AppContext";

export default function FilterBar({ instances }: { instances: any[] }) {
  // Extract unique values for dropdowns
  const regions = Array.from(new Set(instances.map(i => i.region)));
  const types = Array.from(new Set(instances.map(i => i.type)));
  const owners = Array.from(new Set(instances.map(i => i.owner)));
  const wasteLevels = ["All", "Underused", "Over-provisioned", "OK"];

  // Context for all filters
  const { filter, setFilter, typeFilter, setTypeFilter, ownerFilter, setOwnerFilter, wasteFilter, setWasteFilter } = useAppContext();

  // Simple SVG icons for context
  const icons = {
    region: <span className="mr-2">🌎</span>,
    type: <span className="mr-2">🖥️</span>,
    owner: <span className="mr-2">👤</span>,
    waste: <span className="mr-2">⚡</span>

  };

  return (
  <div className="mb-6 w-full bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-lg flex flex-wrap gap-6 justify-between items-center">
      <div className="flex flex-col w-full sm:w-1/5 min-w-[160px]">
        <label htmlFor="region-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.region}Region</label>
        <select
          id="region-select"
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
      <div className="flex flex-col w-full sm:w-1/5 min-w-[160px]">
        <label htmlFor="type-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.type}Type</label>
        <select
          id="type-select"
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
      <div className="flex flex-col w-full sm:w-1/5 min-w-[160px]">
        <label htmlFor="owner-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.owner}Owner</label>
        <select
          id="owner-select"
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
      <div className="flex flex-col w-full sm:w-1/5 min-w-[160px]">
        <label htmlFor="waste-select" className="mb-1 text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center">{icons.waste}Waste Level</label>
        <select
          id="waste-select"
          className="border border-blue-200 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
          value={wasteFilter}
          onChange={e => setWasteFilter(e.target.value)}
        >
          {wasteLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
