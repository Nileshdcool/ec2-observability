

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
  const [trendRange, setTrendRange] = React.useState<'7d' | '24h'>('7d');
  const { filter, typeFilter, ownerFilter, wasteFilter, jobIdFilter } = useAppContext();
  // Apply filters to instances
  let filteredInstances = instances;
  if (filter) filteredInstances = filteredInstances.filter(i => i.region === filter);
  if (typeFilter) filteredInstances = filteredInstances.filter(i => i.type === typeFilter);
  if (ownerFilter) filteredInstances = filteredInstances.filter(i => i.owner === ownerFilter);
  if (jobIdFilter) filteredInstances = filteredInstances.filter(i => i.jobId === jobIdFilter);
  if (wasteFilter && wasteFilter !== "All") filteredInstances = filteredInstances.filter(i => i.waste === wasteFilter);

  // Calculate cost overview based on filtered instances
  const total = filteredInstances.reduce((sum, i) => sum + i.costPerHour * i.uptime, 0);
  const dailyBurn = filteredInstances.reduce((sum, i) => sum + i.costPerHour * 24, 0);
  const projectedMonthly = dailyBurn * 30;
  const lastMonth = costOverview.lastMonth;
  const trend = costOverview.trend;
  // Simulate 24h trend from last value for demo
  const trend24h = trend ? Array(24).fill(trend[trend.length - 1]) : [];
  const peakDay = costOverview.peakDay;
  const lowestDay = costOverview.lowestDay;
  const costChange = total - lastMonth;
  const costChangePct = lastMonth ? ((costChange / lastMonth) * 100).toFixed(1) : "0";
  const isSpike = peakDay.cost > dailyBurn * 1.3;
  const isDrop = lowestDay.cost < dailyBurn * 0.7;

  return (
  <div className="bg-white dark:bg-gray-900 p-6 rounded shadow flex flex-col gap-4 w-full max-w-2xl mx-auto">
  <h2 className="font-bold text-xl text-blue-600 dark:text-blue-300 mb-2">Cloud Cost Overview</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-lg">
        <div className="flex flex-col">
          <span className="text-gray-900 dark:text-gray-100">Total Cost</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-2xl">${total?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 dark:text-gray-100">Daily Burn</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-2xl">${dailyBurn?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 dark:text-gray-100">Projected Monthly</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-2xl">${projectedMonthly?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 dark:text-gray-100">Change vs Last Month</span>
          <span className={`font-semibold text-2xl ${costChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{costChange > 0 ? '+' : ''}{costChangePct}%</span>
        </div>
      </div>

      {/* Cost Trend Chart (Recharts) with time range toggle */}
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-800 dark:text-gray-200">Trend:</span>
          <button
            className={`px-2 py-1 rounded text-xs ${trendRange === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setTrendRange('7d')}
          >7d</button>
          <button
            className={`px-2 py-1 rounded text-xs ${trendRange === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setTrendRange('24h')}
          >24h</button>
        </div>
        <div className="w-full overflow-x-auto" style={{ minWidth: 300, maxWidth: 500, height: 100 }}>
          <div style={{ width: "100%", height: "100%", minWidth: 300, maxWidth: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendRange === '7d'
                  ? trend?.map((d: number, i: number) => ({
                      label: `Day ${i + 1}`,
                      cost: d,
                      isSpike: d > dailyBurn * 1.3,
                      isDrop: d < dailyBurn * 0.7,
                    }))
                  : trend24h.map((d: number, i: number) => ({
                      label: `${i}:00`,
                      cost: d,
                      isSpike: d > dailyBurn * 1.3,
                      isDrop: d < dailyBurn * 0.7,
                    }))}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis hide domain={[0, 'dataMax + 10']} />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} dot={false} name="Cost" />
                {/* Spike cues */}
                {(trendRange === '7d' ? trend : trend24h)?.map((d: number, i: number) => (
                  d > dailyBurn * 1.3 ? (
                    <ReferenceDot key={`spike-${trendRange}-${i}`} x={trendRange === '7d' ? `Day ${i + 1}` : `${i}:00`} y={d} r={4} fill="#ef4444" stroke="none" />
                  ) : null
                ))}
                {/* Lowest cues */}
                {(trendRange === '7d' ? trend : trend24h)?.map((d: number, i: number) => (
                  d < dailyBurn * 0.7 ? (
                    <ReferenceDot key={`drop-${trendRange}-${i}`} x={trendRange === '7d' ? `Day ${i + 1}` : `${i}:00`} y={d} r={4} fill="#22c55e" stroke="none" />
                  ) : null
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Legend for anomaly cues */}
        <div className="flex items-center gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-red-500"></span> Spike (above 1.3x daily burn)</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> Drop (below 0.7x daily burn)</span>
        </div>
        {/* Summary message for anomalies */}
        {((trendRange === '7d' ? trend : trend24h)?.some((d: number) => d > dailyBurn * 1.3) || (trendRange === '7d' ? trend : trend24h)?.some((d: number) => d < dailyBurn * 0.7)) && (
          <div className="mt-1 text-xs text-red-600 dark:text-red-400 font-semibold">Anomaly detected: {((trendRange === '7d' ? trend : trend24h)?.filter((d: number) => d > dailyBurn * 1.3).length || 0)} spike(s), {((trendRange === '7d' ? trend : trend24h)?.filter((d: number) => d < dailyBurn * 0.7).length || 0)} drop(s) in selected range.</div>
        )}
      </div>

      {/* Peak/Low Info */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100">Peak Day:</span>
          <span className="text-gray-800 dark:text-gray-200">{peakDay?.date}</span>
          <span className="text-red-600 dark:text-red-400 font-bold">${peakDay?.cost}</span>
          {isSpike && <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-xs">Spike</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100">Lowest Day:</span>
          <span className="text-gray-800 dark:text-gray-200">{lowestDay?.date}</span>
          <span className="text-green-600 dark:text-green-400 font-bold">${lowestDay?.cost}</span>
          {isDrop && <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">Drop</span>}
        </div>
      </div>
    </div>
  );
}
