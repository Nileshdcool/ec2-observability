import React, { useEffect, useState } from 'react';
import { LambdaFunction } from '../types/lambda';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const LambdaFunctionTable: React.FC = () => {
  const [functions, setFunctions] = useState<LambdaFunction[]>([]);

  useEffect(() => {
    fetch('/api/lambda')
      .then(res => res.json())
      .then(setFunctions);
  }, []);

  // Summary
  const totalCost = functions.reduce((sum, f) => sum + f.cost, 0);
  const totalInvocations = functions.reduce((sum, f) => sum + f.invocations, 0);
  const totalErrors = functions.reduce((sum, f) => sum + f.errors, 0);

  // Fake invocations trend data for chart (in real app, use historical data)
  const invocationsTrend = functions.map(f => ({ name: f.name, invocations: f.invocations }));

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">Lambda Functions</h2>
      {/* Summary cards */}
      <div className="flex gap-4 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 rounded p-3 min-w-[120px]">
          <div className="text-xs text-gray-500">Total Cost</div>
          <div className="text-lg font-bold">${totalCost.toFixed(2)}</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded p-3 min-w-[120px]">
          <div className="text-xs text-gray-500">Total Invocations</div>
          <div className="text-lg font-bold">{totalInvocations.toLocaleString()}</div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 rounded p-3 min-w-[120px]">
          <div className="text-xs text-gray-500">Total Errors</div>
          <div className="text-lg font-bold">{totalErrors}</div>
        </div>
      </div>
      {/* Invocations trend chart */}
      <div className="mb-4 bg-white dark:bg-gray-900 rounded p-3">
        <div className="text-xs text-gray-500 mb-1">Invocations by Function</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={invocationsTrend} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="invocations" stroke="#f59e42" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Invocations</th>
            <th>Errors</th>
            <th>Cost ($)</th>
            <th>Avg Duration (ms)</th>
            <th>Memory (MB)</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {functions.map(fn => (
            <tr key={fn.name}>
              <td>{fn.name}</td>
              <td>{fn.region}</td>
              <td>{fn.invocations}</td>
              <td>{fn.errors}</td>
              <td>{fn.cost}</td>
              <td>{fn.avgDurationMs}</td>
              <td>{fn.memoryMb}</td>
              <td>{new Date(fn.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LambdaFunctionTable;
