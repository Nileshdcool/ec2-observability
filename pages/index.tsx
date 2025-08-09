import InstanceTable from "@/components/InstanceTable";
import CostAttributionPanel from "@/components/CostAttributionPanel";
import CostOverview from "@/components/CostOverview";
import UtilizationTimeline from "@/components/UtilizationTimeline";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  // example: Put filter state in parent
  // You can expand with Context or Zustand for more complex apps

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6">
    <h1 className="text-3xl font-bold text-blue-700">EC2 Observability Dashboard</h1>
    <p className="text-gray-800">Gain insights on EC2 usage, costs, and waste for research teams</p>
      </header>
      
      {/* Filters */}
      <FilterBar />

      {/* Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <CostOverview />
        <CostAttributionPanel />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <InstanceTable />
        <UtilizationTimeline />
      </div>
    </div>
  );
}
