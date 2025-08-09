
export function getWasteStatus(inst: any) {
  return inst.cpu < 2 && inst.uptime > 24;
}

export default function InstanceTable({ instances }: { instances: any[] }) {
  return (
    <div className="bg-white rounded shadow p-6 overflow-x-auto">
      <h2 className="font-bold text-xl text-blue-600 mb-2">EC2 Instance Utilization</h2>
      <table className="min-w-[600px] w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">Name</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">Type</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">Region</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">CPU</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">RAM</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">GPU</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">Uptime</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">Cost/Hour</th>
            <th className="px-2 py-2 text-gray-900 whitespace-nowrap">Waste</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(inst => (
            <tr key={inst.id} className={getWasteStatus(inst) ? "bg-red-50" : ""}>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.name}</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.type}</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.region}</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.cpu}</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.ram}GB</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.gpu}</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">{inst.uptime}h</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">${inst.costPerHour}</td>
              <td className="px-2 py-2 text-gray-900 whitespace-nowrap">
                {getWasteStatus(inst) ? (
                  <span className="text-red-600 font-semibold">Waste</span>
                ) : (
                  <span className="text-green-600">OK</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
