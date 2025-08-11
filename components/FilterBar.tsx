import { useAppContext } from "../lib/AppContext";
import { instances } from "../mock-data/ec2Instances";

export default function FilterBar() {
  // Extract unique values for dropdowns
  const regions = Array.from(new Set(instances.map(i => i.region)));
  const types = Array.from(new Set(instances.map(i => i.type)));
  const owners = Array.from(new Set(instances.map(i => i.owner)));
  const wasteLevels = ["All", "Underused", "Over-provisioned", "OK"];

  // Context for all filters
  const { filter, setFilter, typeFilter, setTypeFilter, ownerFilter, setOwnerFilter, wasteFilter, setWasteFilter } = useAppContext();

  return (
    <div className="mb-4 flex gap-4 flex-wrap bg-white p-4 rounded shadow w-full">
      <select
        className="border px-2 py-1 rounded text-gray-900 w-full sm:w-auto"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="">All Regions</option>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <select
        className="border px-2 py-1 rounded text-gray-900 w-full sm:w-auto"
        value={typeFilter}
        onChange={e => setTypeFilter(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select
        className="border px-2 py-1 rounded text-gray-900 w-full sm:w-auto"
        value={ownerFilter}
        onChange={e => setOwnerFilter(e.target.value)}
      >
        <option value="">All Owners</option>
        {owners.map(owner => (
          <option key={owner} value={owner}>{owner}</option>
        ))}
      </select>
      <select
        className="border px-2 py-1 rounded text-gray-900 w-full sm:w-auto"
        value={wasteFilter}
        onChange={e => setWasteFilter(e.target.value)}
      >
        {wasteLevels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>
  );
}
