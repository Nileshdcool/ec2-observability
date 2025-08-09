import { costOverview } from "@/mock-data/costs";

export default function CostOverview() {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col gap-3">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Cloud Cost Overview</h2>
      <div className="flex gap-6 text-lg">
        <div>Total Cost: <span className="font-semibold">${costOverview.total}</span></div>
        <div>Daily Burn: <span className="font-semibold">${costOverview.dailyBurn}</span></div>
        <div>Projected Monthly: <span className="font-semibold">${costOverview.projectedMonthly}</span></div>
      </div>
      <div className="mt-2">
        <span className="text-sm text-gray-500">Trend (last 7 days):</span>
        <div className="flex gap-2 mt-1">
          {costOverview.trend.map((d, idx) => (
            <div key={idx} className="h-2 rounded bg-blue-400" style={{ width: `${d}px` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
