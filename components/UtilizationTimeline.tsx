
import React, { useState } from "react";
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

const usageData = [
  { time: "00:00", cpu: 10, ram: 4 },
  { time: "01:00", cpu: 40, ram: 8 },
  { time: "02:00", cpu: 30, ram: 7 },
  { time: "03:00", cpu: 80, ram: 16 },
  { time: "04:00", cpu: 60, ram: 10 },
];

const annotations = [
  { time: "03:00", cpu: 80, label: "Peak CPU" },
];

const UtilizationTimeline: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState({ startIndex: 0, endIndex: usageData.length - 1 });

  const handleBrushChange = (e: any) => {
    if (e && typeof e.startIndex === "number" && typeof e.endIndex === "number") {
      setSelectedRange({ startIndex: e.startIndex, endIndex: e.endIndex });
    }
  };

  const filteredData = usageData.slice(selectedRange.startIndex, selectedRange.endIndex + 1);

  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center w-full">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Instance Utilization Timeline</h2>
      <div className="w-full max-w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usageData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
      </div>
      <div className="mt-2 text-xs text-gray-800">
        Selected range: {usageData[selectedRange.startIndex].time} to {usageData[selectedRange.endIndex].time}
      </div>
    </div>
  );
};

export default UtilizationTimeline;
