

import InstanceTable from "@/components/InstanceTable";
import RDSInstanceTable from "@/components/RDSInstanceTable";
import S3BucketTable from "@/components/S3BucketTable";
import LambdaFunctionTable from "@/components/LambdaFunctionTable";
import CostAttributionPanel from "@/components/CostAttributionPanel";
import CostOverview from "@/components/CostOverview";
import UtilizationTimeline from "@/components/UtilizationTimeline";
import ThemeToggle from "@/components/ThemeToggle";
import FilterBar from "@/components/FilterBar";
import { motion } from "framer-motion";
import { getAppVersion } from "../lib/version";
import AppFooter from "@/components/AppFooter";

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

import React, { useState } from "react";

export default function Home({ instances, costOverview, attribution, utilizationData }: any) {
  const [tab, setTab] = useState<'ec2' | 'rds' | 's3' | 'lambda'>('ec2');
  if (typeof window !== "undefined") {
    window.costOverview = costOverview;
  }
  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 transition-colors flex flex-col min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Cloud Observability Dashboard</h1>
        <p className="text-gray-800 dark:text-gray-200">Gain insights on AWS usage, costs, and waste for research teams</p>
      </header>

      {/* Tabs for resource selection */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-t ${tab === 'ec2' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setTab('ec2')}
        >
          EC2
        </button>
        <button
          className={`px-4 py-2 rounded-t ${tab === 'rds' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setTab('rds')}
        >
          RDS
        </button>
        <button
          className={`px-4 py-2 rounded-t ${tab === 's3' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setTab('s3')}
        >
          S3
        </button>
        <button
          className={`px-4 py-2 rounded-t ${tab === 'lambda' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setTab('lambda')}
        >
          Lambda
        </button>
      </div>

      {/* Filters and Overview only for EC2 */}
      {tab === 'ec2' && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <FilterBar instances={instances} />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <CostOverview costOverview={costOverview} instances={instances} />
            <CostAttributionPanel attribution={attribution} instances={instances} />
          </motion.div>
        </>
      )}

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        {tab === 'ec2' && <InstanceTable instances={instances} />}
        {tab === 'ec2' && <UtilizationTimeline usageData={utilizationData} annotations={costOverview.annotations || []} />}
        {tab === 'rds' && <RDSInstanceTable />}
        {tab === 's3' && <S3BucketTable />}
        {tab === 'lambda' && <LambdaFunctionTable />}
      </motion.div>

      {/* Floating theme toggle button */}
      <ThemeToggle />
      {/* App version and environment info */}
      <AppFooter />
    </motion.div>
  );
}
