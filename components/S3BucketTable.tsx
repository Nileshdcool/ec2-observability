import React, { useEffect, useState } from 'react';
import { S3Bucket } from '../types/s3';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const S3BucketTable: React.FC = () => {
  const [buckets, setBuckets] = useState<S3Bucket[]>([]);

  useEffect(() => {
    fetch('/api/s3')
      .then(res => res.json())
      .then(setBuckets);
  }, []);

  // Summary
  const totalCost = buckets.reduce((sum, b) => sum + b.cost, 0);
  const totalStorage = buckets.reduce((sum, b) => sum + b.storage, 0);
  const totalObjects = buckets.reduce((sum, b) => sum + b.objects, 0);

  // Fake storage trend data for chart (in real app, use historical data)
  const storageTrend = buckets.map(b => ({ name: b.name, storage: b.storage }));

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">S3 Buckets</h2>
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
          <div className="text-xs text-gray-500">Total Objects</div>
          <div className="text-lg font-bold">{totalObjects.toLocaleString()}</div>
        </div>
      </div>
      {/* Storage trend chart */}
      <div className="mb-4 bg-white dark:bg-gray-900 rounded p-3">
        <div className="text-xs text-gray-500 mb-1">Storage by Bucket</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={storageTrend} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="storage" stroke="#059669" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Storage (GB)</th>
            <th>Objects</th>
            <th>Cost ($)</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map(bucket => (
            <tr key={bucket.name}>
              <td>{bucket.name}</td>
              <td>{bucket.region}</td>
              <td>{bucket.storage}</td>
              <td>{bucket.objects}</td>
              <td>{bucket.cost}</td>
              <td>{new Date(bucket.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default S3BucketTable;
