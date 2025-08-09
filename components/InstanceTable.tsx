import { instances } from "@/mock-data/ec2Instances";

function getWasteStatus(inst: any) {
  // Example logic: waste if CPU < 20% and uptime > 24h
  return inst.cpu < 2 && inst.uptime > 24;
}

export default function InstanceTable() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="font-bold text-xl text-blue-600 mb-2">EC2 Instance Utilization</h2>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Type</th>
            <th className="px-2 py-2">Region</th>
            <th className="px-2 py-2">CPU</th>
            <th className="px-2 py-2">RAM</th>
            <th className="px-2 py-2">GPU</th>
            <th className="px-2 py-2">Uptime</th>
            <th className="px-2 py-2">Cost/Hour</th>
            <th className="px-2 py-2">Waste</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(inst => (
            <tr key={inst.id} className={getWasteStatus(inst) ? "bg-red-50" : ""}>
              <td className="px-2 py-2">{inst.name}</td>
              <td className="px-2 py-2">{inst.type}</td>
              <td className="px-2 py-2">{inst.region}</td>
              <td className="px-2 py-2">{inst.cpu}</td>
              <td className="px-2 py-2">{inst.ram}GB</td>
              <td className="px-2 py-2">{inst.gpu}</td>
              <td className="px-2 py-2">{inst.uptime}h</td>
              <td className="px-2 py-2">${inst.costPerHour}</td>
              <td className="px-2 py-2">
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
