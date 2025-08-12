import React, { useState } from "react";
import { useAppContext } from "../lib/AppContext";
import { instances as allInstances } from "../mock-data/ec2Instances";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";


interface UsageDatum {
  time: string;
  cpu: number;
  ram: number;
  gpu?: number;
  instanceId?: string;
}

interface Annotation {
  time: string;
  cpu: number;
  label: string;
}

const UtilizationTimeline: React.FC<{ usageData: UsageDatum[]; annotations?: Annotation[]; instanceId?: string }> = ({ usageData, annotations = [], instanceId }) => {
  // Time range toggle
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('7d');
  // Server selection
  const [selectedInstance, setSelectedInstance] = useState<string>(instanceId || '');
  // Get filters from context
  const { filter, typeFilter, ownerFilter, wasteFilter } = useAppContext();

  // Find filtered instances
  let filteredInstances = allInstances;
  if (filter) filteredInstances = filteredInstances.filter(inst => inst.region === filter);
  if (typeFilter) filteredInstances = filteredInstances.filter(inst => inst.type === typeFilter);
  if (ownerFilter) filteredInstances = filteredInstances.filter(inst => inst.owner === ownerFilter);
  if (wasteFilter && wasteFilter !== "All") {
    filteredInstances = filteredInstances.filter(inst => {
      if (wasteFilter === "Underused") return inst.cpu < 2 && inst.uptime > 24;
      if (wasteFilter === "Over-provisioned") return inst.cpu > 16 && inst.uptime < 24;
      return wasteFilter === "OK";
    });
  }
  // Server selection UI
  const instanceOptions = filteredInstances.map(inst => ({ id: inst.id, name: inst.name }));
  let activeInstanceId = selectedInstance;
  // If 'All Servers' is selected, do not filter by instanceId
  if (activeInstanceId && filteredInstances.some(inst => inst.id === activeInstanceId)) {
    filteredInstances = filteredInstances.filter(inst => inst.id === activeInstanceId);
  } else if (!activeInstanceId) {
    filteredInstances = allInstances;
  }

  // Filter usageData by matching instanceId if present in usageData
  let filteredUsageData = usageData;
  if (usageData.length > 0 && "instanceId" in usageData[0]) {
    if (!activeInstanceId) {
      // All servers selected: show all usageData for filteredInstances
      const validIds = new Set(filteredInstances.map(inst => inst.id));
      filteredUsageData = usageData.filter((d: any) => validIds.has(d.instanceId));
    } else {
      filteredUsageData = usageData.filter((d: any) => d.instanceId === activeInstanceId);
    }
  }
  // Time range filtering (simulate for demo)
  let timeFilteredData = filteredUsageData;
  if (timeRange === '1h') timeFilteredData = filteredUsageData.slice(-1);
  else if (timeRange === '24h') timeFilteredData = filteredUsageData.slice(-24);
  // else 7d: show all

  const [selectedRange, setSelectedRange] = useState({ startIndex: 0, endIndex: Math.max(0, timeFilteredData.length - 1) });

  const handleBrushChange = (e: any) => {
    if (e && typeof e.startIndex === "number" && typeof e.endIndex === "number") {
      setSelectedRange({ startIndex: e.startIndex, endIndex: e.endIndex });
    }
  };

  const filteredData = timeFilteredData.slice(selectedRange.startIndex, selectedRange.endIndex + 1);

  const hasData = timeFilteredData && timeFilteredData.length > 0;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow flex flex-col items-center w-full">
      <h2 className="font-bold text-xl text-blue-600 dark:text-blue-300 mb-2">Instance Utilization Timeline</h2>
      {/* Server selection and time range toggle */}
      <div className="flex gap-4 mb-2 w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-800 dark:text-gray-200">Server:</span>
          <select value={activeInstanceId} onChange={e => { setSelectedInstance(e.target.value); }} className="p-1 rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option value="">All Servers</option>
            {instanceOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name || opt.id}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-800 dark:text-gray-200">Range:</span>
          <button className={`px-2 py-1 rounded text-xs ${timeRange === '1h' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`} onClick={() => setTimeRange('1h')}>1h</button>
          <button className={`px-2 py-1 rounded text-xs ${timeRange === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`} onClick={() => setTimeRange('24h')}>24h</button>
          <button className={`px-2 py-1 rounded text-xs ${timeRange === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`} onClick={() => setTimeRange('7d')}>7d</button>
        </div>
      </div>
      <div className="w-full max-w-full h-80">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeFilteredData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#4299e1" dot={false} name="CPU Usage" />
              <Line type="monotone" dataKey="ram" stroke="#48bb78" dot={false} name="RAM Usage" />
              {/* GPU Usage Visualization */}
              {timeFilteredData.some(d => typeof d.gpu === 'number') && (
                <Line type="monotone" dataKey="gpu" stroke="#f59e42" dot={false} name="GPU Usage" />
              )}
              {/* Annotations */}
              {annotations.map((a, idx) => (
                <ReferenceDot key={idx} x={a.time} y={a.cpu} r={6} fill="#ff7300" stroke="none" label={a.label} />
              ))}
              {/* Idle/spiky behavior cues (shading) */}
              {filteredData.map((d, idx) => (
                d.cpu < 2 ? (
                  <ReferenceDot key={`idle-${idx}`} x={d.time} y={d.cpu} r={4} fill="#22c55e" stroke="none" label="Idle" />
                ) : d.cpu > 32 ? (
                  <ReferenceDot key={`spiky-${idx}`} x={d.time} y={d.cpu} r={4} fill="#ef4444" stroke="none" label="Spike" />
                ) : null
              ))}
              {/* Time selection */}
              <Brush dataKey="time" height={30} stroke="#4299e1" onChange={handleBrushChange} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">No usage data available.</div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-800 dark:text-gray-200">
        {hasData ? (
          <>Selected range: {timeFilteredData[selectedRange.startIndex]?.time} to {timeFilteredData[selectedRange.endIndex]?.time}</>
        ) : (
          <>No data to display.</>
        )}
      </div>
    </div>
  );
};

export default UtilizationTimeline;
