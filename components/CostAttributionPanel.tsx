import { attribution } from "@/mock-data/costs";

export default function CostAttributionPanel() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl text-blue-600 mb-2">Cost Attribution</h2>
      <table className="w-full border mb-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-1 px-2 text-left">Dimension</th>
            <th className="py-1 px-2 text-left">Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {attribution.map(d => (
            <tr key={d.dimension}>
              <td className="py-1 px-2">{d.dimension}</td>
              <td className="py-1 px-2">${d.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-2">
        {attribution.map(a => (
          <div key={a.dimension} className="flex flex-col items-center">
            <div 
              className="w-8 bg-blue-500 rounded" 
              style={{ height: `${a.cost/10}px` }} // scale for demo
            ></div>
            <span className="text-xs">{a.dimension}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <strong>Total:</strong> ${attribution.reduce((sum, a) => sum + a.cost, 0)}
      </div>
    </div>
  );
}
