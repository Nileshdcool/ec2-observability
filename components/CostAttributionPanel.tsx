

import React, { useState } from "react";

type Attribution = {
  dimension: string;
  cost: number;
  timeSeries?: { time: string; cost: number }[];
};

export default function CostAttributionPanel({ attribution }: { attribution: Attribution[] }) {
  const [view, setView] = useState<'table' | 'chart'>("table");
  const [compareBy, setCompareBy] = useState<'dimension' | 'time'>("dimension");

  // Check if any attribution has timeSeries data
  const hasTimeSeries = attribution.some(a => a.timeSeries && a.timeSeries.length > 0);

  // Helper for total cost
  const totalCost = compareBy === "dimension"
    ? attribution.reduce((sum, a) => sum + a.cost, 0)
    : hasTimeSeries
      ? attribution.reduce((sum, a) => sum + (a.timeSeries ? a.timeSeries.reduce((s, t) => s + t.cost, 0) : 0), 0)
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
              {attribution.map(d => (
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
              {attribution.flatMap(d =>
                (d.timeSeries || []).map(ts => (
                  <tr key={d.dimension + ts.time}>
                    <td className="py-1 px-2 text-gray-900 whitespace-nowrap">{d.dimension}</td>
                    <td className="py-1 px-2 text-gray-900 whitespace-nowrap">{ts.time}</td>
                    <td className="py-1 px-2 text-gray-900 whitespace-nowrap">${ts.cost}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart View: Dimension Comparison */}
      {view === "chart" && compareBy === "dimension" && (
        <div className="overflow-x-auto mt-2">
          <div className="relative w-full" style={{ minWidth: 400, height: 180 }}>
            {/* SVG Bar Chart */}
            <svg width="100%" height="180" viewBox={`0 0 ${Math.max(attribution.length * 60, 400)} 180`}>
              {/* Y-axis */}
              <line x1="40" y1="20" x2="40" y2="160" stroke="#888" />
              {/* X-axis */}
              <line x1="40" y1="160" x2={attribution.length * 60 + 20} y2="160" stroke="#888" />
              {/* Y-axis labels */}
              {[0, 500, 1000, 1500, 2000].map((v) => (
                <text key={v} x="35" y={160 - v / 10} fontSize="10" textAnchor="end" fill="#555">{v}</text>
              ))}
              {/* Bars */}
              {attribution.map((a, i) => {
                const barHeight = a.cost / 10;
                const x = 60 * i + 50;
                return (
                  <g key={a.dimension}>
                    <rect
                      x={x}
                      y={160 - barHeight}
                      width="32"
                      height={barHeight}
                      fill="#3b82f6"
                      rx="4"
                    />
                    {/* Cost label above bar */}
                    <text x={x + 16} y={160 - barHeight - 8} fontSize="11" textAnchor="middle" fill="#222">${a.cost}</text>
                    {/* Dimension label below bar */}
                    <text x={x + 16} y={172} fontSize="10" textAnchor="middle" fill="#555">{a.dimension}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Chart View: Time Comparison */}
      {view === "chart" && compareBy === "time" && hasTimeSeries && (
        <div className="overflow-x-auto mt-2">
          {/* Simple line chart using SVG for demo purposes */}
          {(() => {
            // Get all unique time labels from all timeSeries
            const timeLabels = Array.from(new Set(
              attribution.flatMap(a => (a.timeSeries || []).map(ts => ts.time))
            ));
            return (
              <div className="relative">
                <svg width="100%" height="120" viewBox="0 0 400 120">
                  {attribution.map((a, idx) => {
                    if (!a.timeSeries || a.timeSeries.length === 0) return null;
                    // Map timeLabels to cost for each dimension
                    const points = timeLabels.map((label, i) => {
                      const ts = a.timeSeries?.find(t => t.time === label);
                      const len = timeLabels.length;
                      const x = len > 1 ? (i / (len - 1)) * 380 + 10 : 10;
                      const y = ts ? 110 - ts.cost / 10 : 110;
                      return `${x},${y}`;
                    }).join(' ');
                    return (
                      <polyline
                        key={a.dimension}
                        points={points}
                        fill="none"
                        stroke={idx % 2 === 0 ? "#3b82f6" : "#6366f1"}
                        strokeWidth="2"
                      />
                    );
                  })}
                  {/* Axes */}
                  <line x1="10" y1="10" x2="10" y2="110" stroke="#888" />
                  <line x1="10" y1="110" x2="390" y2="110" stroke="#888" />
                  {/* X-axis time labels */}
                  {timeLabels.map((label, i) => {
                    const len = timeLabels.length;
                    const x = len > 1 ? (i / (len - 1)) * 380 + 10 : 10;
                    return (
                      <text
                        key={label}
                        x={x}
                        y={118}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#555"
                      >{label}</text>
                    );
                  })}
                </svg>
                {/* Legend */}
                <div className="flex gap-4 justify-center mt-2">
                  {attribution.map(a => (
                    <span key={a.dimension} className="text-xs text-gray-900">
                      <span className="inline-block w-3 h-3 mr-1 rounded" style={{ background: "#3b82f6" }}></span>
                      {a.dimension}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Empty State */}
      {attribution.length === 0 && (
        <div className="text-gray-500 text-center py-8">No cost attribution data available.</div>
      )}

      <div className="mt-4 text-sm text-gray-800">
        <strong>Total:</strong> ${totalCost}
      </div>
    </div>
  );
}
