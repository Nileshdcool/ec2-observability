export default function UtilizationTimeline() {
  // Simulated data
  const usageData = [
    { time: '00:00', cpu: 10, ram: 4 },
    { time: '01:00', cpu: 40, ram: 8 },
    { time: '02:00', cpu: 30, ram: 7 },
    { time: '03:00', cpu: 80, ram: 16 },
    { time: '04:00', cpu: 60, ram: 10 },
    // more...
  ];
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Instance Utilization Timeline</h2>
      <div className="w-full">
        {/* Simple SVG mockup for CPU trend */}
        <svg width="100%" height="80" viewBox="0 0 200 80">
          <polyline
            fill="none"
            stroke="#4299e1"
            strokeWidth="3"
            points={usageData.map((u, i) => `${i*40},${80 - u.cpu}`).join(' ')}
          />
        </svg>
        <div className="flex justify-between text-xs mt-2 px-2">
          {usageData.map(u => <span key={u.time}>{u.time}</span>)}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">CPU usage over last 4 hours</div>
    </div>
  );
}
