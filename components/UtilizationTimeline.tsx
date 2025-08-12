
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
}

interface Annotation {
  time: string;
  cpu: number;
  label: string;
}

const UtilizationTimeline: React.FC<{ usageData: UsageDatum[]; annotations?: Annotation[]; instanceId?: string }> = ({ usageData, annotations = [], instanceId }) => {
  // Get filters from context
  const { filter, typeFilter, ownerFilter, wasteFilter } = useAppContext();

  // Find filtered instances
  let filteredInstances = allInstances;
  if (filter) filteredInstances = filteredInstances.filter(inst => inst.region === filter);
  if (typeFilter) filteredInstances = filteredInstances.filter(inst => inst.type === typeFilter);
  if (ownerFilter) filteredInstances = filteredInstances.filter(inst => inst.owner === ownerFilter);
  if (wasteFilter && wasteFilter !== "All") {
    // Waste logic: Underused (low CPU, high uptime), Over-provisioned (high CPU, low usage)
    filteredInstances = filteredInstances.filter(inst => {
      if (wasteFilter === "Underused") return inst.cpu < 2 && inst.uptime > 24;
      if (wasteFilter === "Over-provisioned") return inst.cpu > 16 && inst.uptime < 24;
      return wasteFilter === "OK";
    });
  }

  // If instanceId is provided, filter to that instance only
  if (instanceId) {
    filteredInstances = filteredInstances.filter(inst => inst.id === instanceId);
  }

  // Filter usageData by matching instanceId if present in usageData
  // If usageData contains instanceId, filter by filteredInstances
  let filteredUsageData = usageData;
  if (usageData.length > 0 && "instanceId" in usageData[0]) {
    const validIds = new Set(filteredInstances.map(inst => inst.id));
    filteredUsageData = usageData.filter((d: any) => validIds.has(d.instanceId));
  }

  const [selectedRange, setSelectedRange] = useState({ startIndex: 0, endIndex: Math.max(0, filteredUsageData.length - 1) });

  const handleBrushChange = (e: any) => {
    if (e && typeof e.startIndex === "number" && typeof e.endIndex === "number") {
      setSelectedRange({ startIndex: e.startIndex, endIndex: e.endIndex });
    }
  };

  const filteredData = filteredUsageData.slice(selectedRange.startIndex, selectedRange.endIndex + 1);

  const hasData = filteredUsageData && filteredUsageData.length > 0;

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Instance Utilization Timeline</h2>
      <div className="w-full max-w-full h-80">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredUsageData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#4299e1" dot={false} name="CPU Usage" />
              <Line type="monotone" dataKey="ram" stroke="#48bb78" dot={false} name="RAM Usage" />
              {/* Annotations */}
              {annotations.map((a, idx) => (
                <ReferenceDot key={idx} x={a.time} y={a.cpu} r={6} fill="#ff7300" stroke="none" label={a.label} />
              ))}
              {/* Time selection */}
              <Brush dataKey="time" height={30} stroke="#4299e1" onChange={handleBrushChange} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No usage data available.</div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-800">
        {hasData ? (
          <>Selected range: {filteredUsageData[selectedRange.startIndex]?.time} to {filteredUsageData[selectedRange.endIndex]?.time}</>
        ) : (
          <>No data to display.</>
        )}
      </div>
    </div>
  );
};

export default UtilizationTimeline;
