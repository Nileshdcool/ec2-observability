

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
} from "recharts";
import { useAppContext } from "../lib/AppContext";

type TimeSeriesDatum = { time: string; cost: number };
type AttributionDatum = { dimension: string; cost: number; timeSeries?: TimeSeriesDatum[] };

export default function CostAttributionPanel({ attribution, instances }: { attribution: AttributionDatum[], instances: any[] }) {
  const { filter, typeFilter, ownerFilter, wasteFilter } = useAppContext();
  const [view, setView] = useState<'table' | 'chart'>("table");
  const [compareBy, setCompareBy] = useState<'dimension' | 'time'>("dimension");

  // Filter attribution by all filters using instances
  let filteredAttribution = attribution;
  if (filter || typeFilter || ownerFilter || (wasteFilter && wasteFilter !== "All")) {
    let filteredInstances = instances;
    if (filter) filteredInstances = filteredInstances.filter(i => i.region === filter);
    if (typeFilter) filteredInstances = filteredInstances.filter(i => i.type === typeFilter);
    if (ownerFilter) filteredInstances = filteredInstances.filter(i => i.owner === ownerFilter);
    if (wasteFilter && wasteFilter !== "All") filteredInstances = filteredInstances.filter(i => i.waste === wasteFilter);

    // Determine dimension type by checking which property matches most dimensions
    // Try owner, region, type, waste
    const dimensionProps = ["owner", "region", "type", "waste"];
    let propMatchCounts: Record<string, number> = {};
    dimensionProps.forEach(prop => {
      propMatchCounts[prop] = filteredAttribution.filter(a => filteredInstances.some(i => i[prop] === a.dimension)).length;
    });
    // Pick the property with the most matches
    const bestProp = dimensionProps.reduce((a, b) => propMatchCounts[a] > propMatchCounts[b] ? a : b);
    // Get valid dimensions
    const validDimensions = new Set(filteredInstances.map(i => i[bestProp]));
    filteredAttribution = filteredAttribution.filter(a => validDimensions.has(a.dimension));
  }

  // Check if any attribution has timeSeries data
  const hasTimeSeries = filteredAttribution.some(a => a.timeSeries && a.timeSeries.length > 0);

  // Helper for total cost
  const totalCost = compareBy === "dimension"
    ? filteredAttribution.reduce((sum, a) => sum + a.cost, 0)
    : hasTimeSeries
      ? filteredAttribution.reduce((sum, a) => sum + (a.timeSeries ? a.timeSeries.reduce((s: number, t: TimeSeriesDatum) => s + t.cost, 0) : 0), 0)
      : 0;

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Title moved to top right button bar, removed duplicate */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-xl text-blue-600">Cost Attribution</div>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
            onClick={() => setView('table')}
            title="Table View"
          >
            {/* Table Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/><line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"/><line x1="3" y1="15" x2="21" y2="15" strokeWidth="2"/><line x1="9" y1="3" x2="9" y2="21" strokeWidth="2"/><line x1="15" y1="3" x2="15" y2="21" strokeWidth="2"/></svg>
          </button>
          <button
            className={`p-2 rounded ${view === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
            onClick={() => setView('chart')}
            title="Chart View"
          >
            {/* Chart Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="13" width="4" height="8" rx="1" strokeWidth="2"/><rect x="9" y="9" width="4" height="12" rx="1" strokeWidth="2"/><rect x="15" y="5" width="4" height="16" rx="1" strokeWidth="2"/></svg>
          </button>
          {hasTimeSeries && (
            <>
              <button
                className={`px-3 py-1 rounded ${compareBy === 'dimension' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                onClick={() => setCompareBy('dimension')}
              >By Dimension</button>
              <button
                className={`px-3 py-1 rounded ${compareBy === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                onClick={() => setCompareBy('time')}
              >By Time</button>
            </>
          )}
        </div>
      </div>

      {/* Table View */}
      {view === "table" && compareBy === "dimension" && (
        <div className="overflow-x-auto">
          <table className="min-w-[300px] w-full border mb-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-1 px-2 text-left text-gray-900 whitespace-nowrap">Dimension</th>
                <th className="py-1 px-2 text-left text-gray-900 whitespace-nowrap">Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttribution.map(d => (
                <tr key={d.dimension}>
                  <td className="py-1 px-2 text-gray-900 whitespace-nowrap">{d.dimension}</td>
                  <td className="py-1 px-2 text-gray-900 whitespace-nowrap">${d.cost}</td>
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
              <tr className="bg-gray-100">
                <th className="py-1 px-2 text-left text-gray-900 whitespace-nowrap">Dimension</th>
                <th className="py-1 px-2 text-left text-gray-900 whitespace-nowrap">Time</th>
                <th className="py-1 px-2 text-left text-gray-900 whitespace-nowrap">Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttribution.flatMap(d =>
                (d.timeSeries || []).map((ts: TimeSeriesDatum) => (
                  <tr key={d.dimension + ts.time}>
                    <td className="py-1 px-2 text-gray-900 whitespace-nowrap">{d.dimension}</td>
                    <td className="py-1 px-2 text-left text-gray-900 whitespace-nowrap">{ts.time}</td>
                    <td className="py-1 px-2 text-gray-900 whitespace-nowrap">${ts.cost}</td>
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
        <div className="text-gray-500 text-center py-8">No cost attribution data available.</div>
      )}

      <div className="mt-4 text-sm text-gray-800">
        <strong>Total:</strong> ${totalCost}
      </div>
    </div>
  );
}
