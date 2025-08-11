import { useAppContext } from "../lib/AppContext";
import { instances } from "../mock-data/ec2Instances";

export default function UtilizationTimeline() {
  const { filter, typeFilter, ownerFilter } = useAppContext();
  // Filter instances based on global filters
  let filteredInstances = instances;
  if (filter) filteredInstances = filteredInstances.filter(i => i.region === filter);
  if (typeFilter) filteredInstances = filteredInstances.filter(i => i.type === typeFilter);
  if (ownerFilter) filteredInstances = filteredInstances.filter(i => i.owner === ownerFilter);

  // For demo, create usageData from filtered instances (show CPU usage for each instance)
  const usageData = filteredInstances.map((inst, idx) => ({
    time: inst.name,
    cpu: inst.cpu * 10, // scale for chart
    ram: inst.ram
  }));

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Instance Utilization Timeline</h2>
      <div className="w-full max-w-full overflow-x-auto">
        {/* Simple SVG mockup for CPU trend */}
        <svg width="100%" height="80" viewBox={`0 0 ${Math.max(usageData.length * 40, 200)} 80`}>
          <polyline
            fill="none"
            stroke="#4299e1"
            strokeWidth="3"
            points={usageData.map((u, i) => `${i*40},${80 - u.cpu}`).join(' ')}
          />
        </svg>
        <div className="flex justify-between text-xs mt-2 px-2 flex-wrap">
          {usageData.map(u => <span key={u.time} className="text-gray-900">{u.time}</span>)}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-800">CPU usage for filtered instances</div>
    </div>
  );
};
