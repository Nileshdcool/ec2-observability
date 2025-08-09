export default function FilterBar() {
  // Dummy UI - you can wire with props/state
  return (
    <div className="mb-4 flex gap-4 flex-wrap bg-white p-4 rounded shadow">
      <input 
        className="border px-2 py-1 rounded placeholder-gray-800"
        type="text" placeholder="Filter by region" />
      <input 
        className="border px-2 py-1 rounded placeholder-gray-800"
        type="text" placeholder="Instance type" />
      <input 
        className="border px-2 py-1 rounded placeholder-gray-800" 
        type="text" placeholder="Owner" />
      <input 
        className="border px-2 py-1 rounded placeholder-gray-800" 
        type="text" placeholder="Waste Level" />
    </div>
  )
}
