
export default function CostOverview({ costOverview }: { costOverview: any }) {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col gap-3">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Cloud Cost Overview</h2>
      <div className="flex flex-wrap gap-6 text-lg">
        <div><span className="text-gray-900">Total Cost:</span> <span className="font-semibold text-gray-900">${costOverview.total}</span></div>
        <div><span className="text-gray-900">Daily Burn:</span> <span className="font-semibold text-gray-900">${costOverview.dailyBurn}</span></div>
        <div><span className="text-gray-900">Projected Monthly:</span> <span className="font-semibold text-gray-900">${costOverview.projectedMonthly}</span></div>
      </div>
      <div className="mt-2">
        <span className="text-sm text-gray-800">Trend (last 7 days):</span>
        <div className="flex flex-wrap gap-2 mt-1 overflow-x-auto">
          {costOverview.trend.map((d: number, idx: number) => (
            <div key={idx} className="h-2 rounded bg-blue-400" style={{ width: `${d}px` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
