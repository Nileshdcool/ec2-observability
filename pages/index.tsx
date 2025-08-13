
import InstanceTable from "@/components/InstanceTable";
import CostAttributionPanel from "@/components/CostAttributionPanel";
import CostOverview from "@/components/CostOverview";
import UtilizationTimeline from "@/components/UtilizationTimeline";
import ThemeToggle from "@/components/ThemeToggle";
import FilterBar from "@/components/FilterBar";
import { motion } from "framer-motion";
import ResponsiveGridLayout from "@/components/DashboardGrid";
import { useEffect, useState } from "react";

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

  // Default layout for 4 panels
  // All panels same size: 1x1 in a 2x2 grid
  // Consistent 2x2 grid, each panel always 1x1, min/max enforced for responsiveness
  const defaultLayout = [
    { i: "costOverview", x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1, static: false },
    { i: "costAttribution", x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1, static: false },
    { i: "instanceTable", x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1, static: false },
    { i: "utilizationTimeline", x: 1, y: 1, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1, static: false }
  ];
  const [layout, setLayout] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("dashboardLayout");
      return saved ? JSON.parse(saved) : defaultLayout;
    }
    return defaultLayout;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dashboardLayout", JSON.stringify(layout));
    }
  }, [layout]);

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

      {/* Customizable Dashboard Panels */}
      <div className="mb-8">
        <ResponsiveGridLayout
          className="layout dashboard-grid"
          layouts={{ lg: layout, md: layout, sm: layout }}
          breakpoints={{ lg: 900, md: 600, sm: 0 }}
          cols={{ lg: 2, md: 1, sm: 1 }}
          rowHeight={340}
          margin={[24, 24]}
          containerPadding={[0, 0]}
          isResizable={false}
          isDraggable
          draggableHandle=".drag-handle"
          onLayoutChange={(l: any) => setLayout(l)}
          style={{ minHeight: 0 }}
        >
          <div key="costOverview" className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col h-full w-full">
            <div className="drag-handle cursor-move select-none font-semibold text-blue-700 dark:text-blue-300 mb-2">Cloud Cost Overview</div>
            <CostOverview costOverview={costOverview} instances={instances} />
          </div>
          <div key="costAttribution" className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col h-full w-full">
            <div className="drag-handle cursor-move select-none font-semibold text-blue-700 dark:text-blue-300 mb-2">Cost Attribution</div>
            <CostAttributionPanel attribution={attribution} instances={instances} />
          </div>
          <div key="instanceTable" className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col overflow-auto h-full w-full">
            <div className="drag-handle cursor-move select-none font-semibold text-blue-700 dark:text-blue-300 mb-2">EC2 Instance Utilization</div>
            <InstanceTable instances={instances} />
          </div>
          <div key="utilizationTimeline" className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col h-full w-full">
            <div className="drag-handle cursor-move select-none font-semibold text-blue-700 dark:text-blue-300 mb-2">Instance Utilization Timeline</div>
            <UtilizationTimeline usageData={utilizationData} annotations={costOverview.annotations || []} />
          </div>
        </ResponsiveGridLayout>
      </div>

      {/* Floating theme toggle button */}
      <ThemeToggle />
    </motion.div>
  );
}
