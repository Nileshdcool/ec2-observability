

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

import { useAppContext } from "../lib/AppContext";

export default function CostOverview({ costOverview, instances }: { costOverview: any, instances: any[] }) {
  const { filter, typeFilter, ownerFilter, wasteFilter } = useAppContext();
  // Apply filters to instances
  let filteredInstances = instances;
  if (filter) filteredInstances = filteredInstances.filter(i => i.region === filter);
  if (typeFilter) filteredInstances = filteredInstances.filter(i => i.type === typeFilter);
  if (ownerFilter) filteredInstances = filteredInstances.filter(i => i.owner === ownerFilter);
  if (wasteFilter && wasteFilter !== "All") filteredInstances = filteredInstances.filter(i => i.waste === wasteFilter);

  // Calculate cost overview based on filtered instances
  const total = filteredInstances.reduce((sum, i) => sum + i.costPerHour * i.uptime, 0);
  const dailyBurn = filteredInstances.reduce((sum, i) => sum + i.costPerHour * 24, 0);
  const projectedMonthly = dailyBurn * 30;
  const lastMonth = costOverview.lastMonth;
  const trend = costOverview.trend;
  const peakDay = costOverview.peakDay;
  const lowestDay = costOverview.lowestDay;
  const costChange = total - lastMonth;
  const costChangePct = lastMonth ? ((costChange / lastMonth) * 100).toFixed(1) : "0";
  const isSpike = peakDay.cost > dailyBurn * 1.3;
  const isDrop = lowestDay.cost < dailyBurn * 0.7;

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Cloud Cost Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-lg">
        <div className="flex flex-col">
          <span className="text-gray-900">Total Cost</span>
          <span className="font-semibold text-gray-900 text-2xl">${total?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900">Daily Burn</span>
          <span className="font-semibold text-gray-900 text-2xl">${dailyBurn?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900">Projected Monthly</span>
          <span className="font-semibold text-gray-900 text-2xl">${projectedMonthly?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900">Change vs Last Month</span>
          <span className={`font-semibold text-2xl ${costChange > 0 ? 'text-red-600' : 'text-green-600'}`}>{costChange > 0 ? '+' : ''}{costChangePct}%</span>
        </div>
      </div>

      {/* Cost Trend Chart (Recharts) */}
      <div className="mt-2">
        <span className="text-sm text-gray-800">Trend (last 7 days):</span>
        <div className="w-full overflow-x-auto" style={{ minWidth: 300, maxWidth: 500, height: 100 }}>
          <div style={{ width: "100%", height: "100%", minWidth: 300, maxWidth: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trend?.map((d: number, i: number) => ({
                  day: `Day ${i + 1}`,
                  cost: d,
                  isSpike: d > dailyBurn * 1.3,
                  isDrop: d < dailyBurn * 0.7,
                }))}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis hide domain={[0, 'dataMax + 10']} />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} dot={false} name="Cost" />
                {/* Spike cues */}
                {trend?.map((d: number, i: number) => (
                  d > dailyBurn * 1.3 ? (
                    <ReferenceDot key={`spike-${i}`} x={`Day ${i + 1}`} y={d} r={4} fill="#ef4444" stroke="none" />
                  ) : null
                ))}
                {/* Lowest cues */}
                {trend?.map((d: number, i: number) => (
                  d < dailyBurn * 0.7 ? (
                    <ReferenceDot key={`drop-${i}`} x={`Day ${i + 1}`} y={d} r={4} fill="#22c55e" stroke="none" />
                  ) : null
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Peak/Low Info */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">Peak Day:</span>
          <span className="text-gray-800">{peakDay?.date}</span>
          <span className="text-red-600 font-bold">${peakDay?.cost}</span>
          {isSpike && <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Spike</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">Lowest Day:</span>
          <span className="text-gray-800">{lowestDay?.date}</span>
          <span className="text-green-600 font-bold">${lowestDay?.cost}</span>
          {isDrop && <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Drop</span>}
        </div>
      </div>
    </div>
  );
}
