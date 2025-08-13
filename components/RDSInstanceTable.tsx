import React, { useEffect, useState } from 'react';
import { RDSInstance } from '../types/rds';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const RDSInstanceTable: React.FC = () => {
  const [instances, setInstances] = useState<RDSInstance[]>([]);

  useEffect(() => {
    fetch('/api/rds')
      .then(res => res.json())
      .then(setInstances);
  }, []);

  // Summary
  const totalCost = instances.reduce((sum, i) => sum + i.cost, 0);
  const totalStorage = instances.reduce((sum, i) => sum + i.storage, 0);
  const avgCPU = instances.length ? (instances.reduce((sum, i) => sum + i.cpuUtilization, 0) / instances.length).toFixed(1) : 0;

  // Fake cost trend data for chart (in real app, use historical data)
  const costTrend = instances.map(i => ({ name: i.name, cost: i.cost }));

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">RDS Instances</h2>
      {/* Summary cards */}
      <div className="flex gap-4 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 rounded p-3 min-w-[120px]">
          <div className="text-xs text-gray-500">Total Cost</div>
          <div className="text-lg font-bold">${totalCost.toFixed(2)}</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded p-3 min-w-[120px]">
          <div className="text-xs text-gray-500">Total Storage</div>
          <div className="text-lg font-bold">{totalStorage} GB</div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 rounded p-3 min-w-[120px]">
          <div className="text-xs text-gray-500">Avg CPU</div>
          <div className="text-lg font-bold">{avgCPU}%</div>
        </div>
      </div>
      {/* Cost trend chart */}
      <div className="mb-4 bg-white dark:bg-gray-900 rounded p-3">
        <div className="text-xs text-gray-500 mb-1">Cost by Instance</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={costTrend} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cost" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Engine</th>
            <th>Status</th>
            <th>Region</th>
            <th>Cost ($)</th>
            <th>CPU (%)</th>
            <th>Storage (GB)</th>
            <th>Used (GB)</th>
            <th>Connections</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(inst => (
            <tr key={inst.id}>
              <td>{inst.name}</td>
              <td>{inst.engine}</td>
              <td>{inst.status}</td>
              <td>{inst.region}</td>
              <td>{inst.cost}</td>
              <td>{inst.cpuUtilization}</td>
              <td>{inst.storage}</td>
              <td>{inst.storageUsed}</td>
              <td>{inst.connections}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RDSInstanceTable;
