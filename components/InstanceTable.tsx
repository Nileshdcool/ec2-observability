import { instances } from "@/mock-data/ec2Instances";

function getWasteStatus(inst: any) {
  return inst.cpu < 2 && inst.uptime > 24;
}

export default function InstanceTable() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="font-bold text-xl text-blue-600 mb-2">EC2 Instance Utilization</h2>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-gray-900">Name</th>
            <th className="px-2 py-2 text-gray-900">Type</th>
            <th className="px-2 py-2 text-gray-900">Region</th>
            <th className="px-2 py-2 text-gray-900">CPU</th>
            <th className="px-2 py-2 text-gray-900">RAM</th>
            <th className="px-2 py-2 text-gray-900">GPU</th>
            <th className="px-2 py-2 text-gray-900">Uptime</th>
            <th className="px-2 py-2 text-gray-900">Cost/Hour</th>
            <th className="px-2 py-2 text-gray-900">Waste</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(inst => (
            <tr key={inst.id} className={getWasteStatus(inst) ? "bg-red-50" : ""}>
              <td className="px-2 py-2 text-gray-900">{inst.name}</td>
              <td className="px-2 py-2 text-gray-900">{inst.type}</td>
              <td className="px-2 py-2 text-gray-900">{inst.region}</td>
              <td className="px-2 py-2 text-gray-900">{inst.cpu}</td>
              <td className="px-2 py-2 text-gray-900">{inst.ram}GB</td>
              <td className="px-2 py-2 text-gray-900">{inst.gpu}</td>
              <td className="px-2 py-2 text-gray-900">{inst.uptime}h</td>
              <td className="px-2 py-2 text-gray-900">${inst.costPerHour}</td>
              <td className="px-2 py-2 text-gray-900">
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
