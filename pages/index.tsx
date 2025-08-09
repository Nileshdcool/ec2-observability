
import InstanceTable from "@/components/InstanceTable";
import CostAttributionPanel from "@/components/CostAttributionPanel";
import CostOverview from "@/components/CostOverview";
import UtilizationTimeline from "@/components/UtilizationTimeline";
import FilterBar from "@/components/FilterBar";

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const apiUrl = process.env.API_URL || `${baseUrl}/api`;
  const [instancesRes, costsRes] = await Promise.all([
    fetch(`${apiUrl}/ec2-instances`),
    fetch(`${apiUrl}/costs`)
  ]);
  const instances = await instancesRes.json();
  const costs = await costsRes.json();
  return {
    props: {
      instances,
      costOverview: costs.costOverview,
      attribution: costs.attribution
    }
  };
}

export default function Home({ instances, costOverview, attribution }: any) {
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
        <CostOverview costOverview={costOverview} />
        <CostAttributionPanel attribution={attribution} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InstanceTable instances={instances} />
        <UtilizationTimeline />
      </div>
    </div>
  );
}
