

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAppContext } from "../lib/AppContext";

// Add global type augmentation for window.costOverview
declare global {
  interface Window {
    costOverview?: { total: number };
  }
}

type TimeSeriesDatum = { time: string; cost: number };
type AttributionDatum = { dimension: string; cost: number; timeSeries?: TimeSeriesDatum[] };

export default function CostAttributionPanel({ attribution, instances }: { attribution: AttributionDatum[], instances: any[] }) {
  const { filter, typeFilter, ownerFilter, wasteFilter } = useAppContext();
  const [view, setView] = useState<'table' | 'chart' | 'pie'>("table");
  const [compareBy, setCompareBy] = useState<'dimension' | 'time'>("dimension");
  const [dimensionType, setDimensionType] = useState<'region' | 'type' | 'owner' | 'jobId' | 'team'>("region");

  // Apply global filters to instances first
  let filteredInstances = instances;
  if (filter) filteredInstances = filteredInstances.filter(i => i.region === filter);
  if (typeFilter) filteredInstances = filteredInstances.filter(i => i.type === typeFilter);
  if (ownerFilter) filteredInstances = filteredInstances.filter(i => i.owner === ownerFilter);
  if (wasteFilter && wasteFilter !== "All") filteredInstances = filteredInstances.filter(i => {
    if (wasteFilter === "Underused") return i.cpu < 2 && i.uptime > 24;
    if (wasteFilter === "Over-provisioned") return i.cpu > 16 && i.uptime < 24;
    return wasteFilter === "OK";
  });

  // Now filter attribution by valid dimensions from filtered instances
  let validDimensions = new Set(filteredInstances.map(i => i[dimensionType]));
  let filteredAttribution = attribution.filter(a => validDimensions.has(a.dimension));

  // Check if any attribution has timeSeries data
  const hasTimeSeries = filteredAttribution.some(a => a.timeSeries && a.timeSeries.length > 0);

  // Helper for total cost
  const totalCost = compareBy === "dimension"
    ? filteredAttribution.reduce((sum, a) => sum + a.cost, 0)
    : hasTimeSeries
      ? filteredAttribution.reduce((sum, a) => sum + (a.timeSeries ? a.timeSeries.reduce((s: number, t: TimeSeriesDatum) => s + t.cost, 0) : 0), 0)
      : 0;
  // Unaccounted cost (difference from costOverview.total)
  const unaccountedCost = typeof window !== "undefined" && window.costOverview ? window.costOverview.total - totalCost : 0;

  return (
  <div className="bg-white dark:bg-gray-900 p-6 rounded shadow">
      {/* Title moved to top right button bar, removed duplicate */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-xl text-blue-600 dark:text-blue-300">Cost Attribution</div>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setView('table')}
            title="Table View"
          >
            {/* Table Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/><line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"/><line x1="3" y1="15" x2="21" y2="15" strokeWidth="2"/><line x1="9" y1="3" x2="9" y2="21" strokeWidth="2"/><line x1="15" y1="3" x2="15" y2="21" strokeWidth="2"/></svg>
          </button>
          <button
            className={`p-2 rounded ${view === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setView('chart')}
            title="Bar Chart View"
          >
            {/* Chart Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="13" width="4" height="8" rx="1" strokeWidth="2"/><rect x="9" y="9" width="4" height="12" rx="1" strokeWidth="2"/><rect x="15" y="5" width="4" height="16" rx="1" strokeWidth="2"/></svg>
          </button>
          <button
            className={`p-2 rounded ${view === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setView('pie')}
            title="Pie Chart View"
          >
            {/* Pie Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path d="M12 2v10l8 4" strokeWidth="2"/></svg>
          </button>
          <select value={dimensionType} onChange={e => setDimensionType(e.target.value as any)} className="ml-2 p-1 rounded border dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900 custom-select">
            <option value="region">Region</option>
            <option value="type">Type</option>
            <option value="owner">Owner/Team</option>
            <option value="jobId">Job ID</option>
          </select>
          <button
            className={`px-3 py-1 rounded ${compareBy === 'dimension' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setCompareBy('dimension')}
          >By Dimension</button>
          <button
            className={`px-3 py-1 rounded ${compareBy === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            onClick={() => setCompareBy('time')}
          >By Time</button>
        </div>
      </div>
      {/* Pie Chart View: Dimension Comparison */}
      {view === "pie" && compareBy === "dimension" && (
        <div className="overflow-x-auto mt-2">
          <div className="relative w-full" style={{ minWidth: 400, height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={filteredAttribution}
                  dataKey="cost"
                  nameKey="dimension"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {filteredAttribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#3b82f6" : "#6366f1"} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Table View */}
      {view === "table" && compareBy === "dimension" && (
        <div className="overflow-x-auto">
          <table className="min-w-[300px] w-full border mb-2">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="py-1 px-2 text-left text-gray-900 dark:text-gray-100 whitespace-nowrap">Dimension</th>
                <th className="py-1 px-2 text-left text-gray-900 dark:text-gray-100 whitespace-nowrap">Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttribution.map(d => (
                <tr key={d.dimension}>
                  <td className="py-1 px-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{d.dimension}</td>
                  <td className="py-1 px-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">${d.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table View: Time Comparison */}
      {view === "table" && compareBy === "time" && hasTimeSeries && (
        <div className="overflow-x-auto">
          <table className="min-w-[300px] w-full border mb-2">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="py-1 px-2 text-left text-gray-900 dark:text-gray-100 whitespace-nowrap">Dimension</th>
                <th className="py-1 px-2 text-left text-gray-900 dark:text-gray-100 whitespace-nowrap">Time</th>
                <th className="py-1 px-2 text-left text-gray-900 dark:text-gray-100 whitespace-nowrap">Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttribution.flatMap(d =>
                (d.timeSeries || []).map((ts: TimeSeriesDatum) => (
                  <tr key={d.dimension + ts.time}>
                    <td className="py-1 px-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{d.dimension}</td>
                    <td className="py-1 px-2 text-left text-gray-900 dark:text-gray-100 whitespace-nowrap">{ts.time}</td>
                    <td className="py-1 px-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">${ts.cost}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart View: Dimension Comparison (Recharts BarChart) */}
      {view === "chart" && compareBy === "dimension" && (
        <div className="overflow-x-auto mt-2">
          <div className="relative w-full" style={{ minWidth: 400, height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={filteredAttribution} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dimension" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#3b82f6" name="Cost ($)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Chart View: Time Comparison (Recharts LineChart) */}
      {view === "chart" && compareBy === "time" && hasTimeSeries && (
        <div className="overflow-x-auto mt-2">
          <div className="relative w-full" style={{ minWidth: 400, height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={(() => {
                  // Merge all timeSeries by time label
                  const timeLabels = Array.from(new Set(
                    filteredAttribution.flatMap(a => (a.timeSeries || []).map((ts: TimeSeriesDatum) => ts.time))
                  ));
                  return timeLabels.map(time => {
                    const entry: any = { time };
                    filteredAttribution.forEach(a => {
                      const ts = a.timeSeries?.find((t: TimeSeriesDatum) => t.time === time);
                      entry[a.dimension] = ts ? ts.cost : null;
                    });
                    return entry;
                  });
                })()}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                {filteredAttribution.map((a, idx) => (
                  <Line
                    key={a.dimension}
                    type="monotone"
                    dataKey={a.dimension}
                    stroke={idx % 2 === 0 ? "#3b82f6" : "#6366f1"}
                    dot={false}
                    name={a.dimension}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAttribution.length === 0 && (
  <div className="text-gray-500 dark:text-gray-400 text-center py-8">No cost attribution data available.</div>
      )}

      <div className="mt-4 text-sm text-gray-800 dark:text-gray-200">
        <strong className="dark:text-gray-100">Total:</strong> ${totalCost}
        {unaccountedCost > 0 && (
          <span className="ml-4 text-red-600 dark:text-red-400">Unaccounted: ${unaccountedCost}</span>
        )}
      </div>
    </div>
  );
}
