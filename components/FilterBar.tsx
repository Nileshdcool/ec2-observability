import { useAppContext } from "../lib/AppContext";

export default function FilterBar() {
  const { filter, setFilter } = useAppContext();
  return (
    <div className="mb-4 flex gap-4 flex-wrap bg-white p-4 rounded shadow w-full">
        <input
          className="border px-2 py-1 rounded placeholder-gray-800 text-gray-900 w-full sm:w-auto"
          type="text"
          placeholder="Filter by region"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        {/* Other filters can be added to context as needed */}
        <input
          className="border px-2 py-1 rounded placeholder-gray-800 text-gray-900 w-full sm:w-auto"
          type="text" placeholder="Instance type" />
        <input
          className="border px-2 py-1 rounded placeholder-gray-800 text-gray-900 w-full sm:w-auto"
          type="text" placeholder="Owner" />
        <input
          className="border px-2 py-1 rounded placeholder-gray-800 text-gray-900 w-full sm:w-auto"
          type="text" placeholder="Waste Level" />
    </div>
  );
}
