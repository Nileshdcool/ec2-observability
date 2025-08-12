
import InstanceTable from "@/components/InstanceTable";
import CostAttributionPanel from "@/components/CostAttributionPanel";
import CostOverview from "@/components/CostOverview";
import UtilizationTimeline from "@/components/UtilizationTimeline";
import ThemeToggle from "@/components/ThemeToggle";
import FilterBar from "@/components/FilterBar";
import { motion } from "framer-motion";

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const apiUrl = process.env.API_URL || `${baseUrl}/api`;
  const [instancesRes, costsRes, utilizationRes] = await Promise.all([
    fetch(`${apiUrl}/ec2-instances`),
    fetch(`${apiUrl}/costs`),
    fetch(`${apiUrl}/utilization`)
  ]);
  const instances = await instancesRes.json();
  const costs = await costsRes.json();
  const utilizationData = await utilizationRes.json();
  return {
    props: {
      instances,
      costOverview: costs.costOverview,
      attribution: costs.attribution,
      utilizationData
    }
  };
}

export default function Home({ instances, costOverview, attribution, utilizationData }: any) {
  // Ensure costOverview is available globally for CostAttributionPanel
  if (typeof window !== "undefined") {
    window.costOverview = costOverview;
  }
  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">EC2 Observability Dashboard</h1>
        <p className="text-gray-800 dark:text-gray-200">Gain insights on EC2 usage, costs, and waste for research teams</p>
      </header>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <FilterBar instances={instances} />
      </motion.div>

      {/* Overview */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <CostOverview costOverview={costOverview} instances={instances} />
        <CostAttributionPanel attribution={attribution} instances={instances} />
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <InstanceTable instances={instances} />
        {/* Pass usageData and annotations if available from API, fallback to [] */}
        <UtilizationTimeline usageData={utilizationData} annotations={costOverview.annotations || []} />
      </motion.div>

      {/* Floating theme toggle button */}
      <ThemeToggle />
    </motion.div>
  );
}
