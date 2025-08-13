

import { WasteFilter } from "../types/enums";
// Waste logic: Underused (low CPU, high uptime), Over-provisioned (high CPU, low usage)
export function getWasteStatus(inst: EC2Instance): WasteFilter {
  if (inst.cpu < 2 && inst.uptime > 24) {
    return WasteFilter.Underused;
  }
  if (inst.cpu > 16 && inst.uptime < 24) {
    return WasteFilter.OverProvisioned;
  }
  return WasteFilter.OK;
}

import type { EC2Instance } from "../types/ec2";
import { useAppContext } from "../lib/AppContext";


import React, { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function InstanceTable({ instances }: { instances: any[] }) {
  const { filter, typeFilter, ownerFilter, wasteFilter, jobIdFilter } = useAppContext();
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  let filteredInstances = instances;
  if (filter) {
    filteredInstances = filteredInstances.filter(inst => inst.region === filter);
  }
  if (typeFilter) {
    filteredInstances = filteredInstances.filter(inst => inst.type === typeFilter);
  }
  if (ownerFilter) {
    filteredInstances = filteredInstances.filter(inst => inst.owner === ownerFilter);
  }
  if (jobIdFilter) {
    filteredInstances = filteredInstances.filter(inst => inst.jobId === jobIdFilter);
  }
  if (wasteFilter && wasteFilter !== "All") {
    filteredInstances = filteredInstances.filter(inst => getWasteStatus(inst) === wasteFilter);
  }

  // Sorting logic
  filteredInstances = [...filteredInstances].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });

  // Table headers config
  const headers = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "region", label: "Region" },
  { key: "cpu", label: "CPU" },
  { key: "ram", label: "RAM" },
  { key: "gpu", label: "GPU" },
  { key: "uptime", label: "Uptime" },
  { key: "costPerHour", label: "Cost/Hour (USD)" },
  { key: "jobId", label: "Job ID" },
  { key: "waste", label: "Waste" },
  ];

  function handleSort(key: string) {
    if (sortBy === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow p-6 overflow-x-auto">
  {/* Removed duplicate header, now handled by drag-handle in grid */}
      <table className="min-w-[600px] w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {headers.map(h => (
              <th
                key={h.key}
                className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap cursor-pointer select-none"
                onClick={() => h.key !== "waste" && handleSort(h.key)}
              >
                {h.label}
                {sortBy === h.key && (
                  <span className="ml-1">{sortDir === "asc" ? "\u25b2" : "\u25bc"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredInstances.map(inst => {
            const wasteStatus = getWasteStatus(inst);
            let wasteClass = "";
            let wasteLabel = "OK";
            let wasteIcon = null;
            let wasteBorder = "";
            if (wasteStatus === "Underused") {
              wasteClass = "bg-yellow-50 dark:bg-yellow-900";
              wasteLabel = "Underused";
              wasteIcon = <ExclamationTriangleIcon className="inline-block w-5 h-5 text-yellow-500 mr-1" title="Underused: Low CPU, High Uptime" />;
              wasteBorder = "border-l-4 border-yellow-400";
            } else if (wasteStatus === "Over-provisioned") {
              wasteClass = "bg-orange-50 dark:bg-orange-900";
              wasteLabel = "Over-provisioned";
              wasteIcon = <ExclamationTriangleIcon className="inline-block w-5 h-5 text-orange-500 mr-1" title="Over-provisioned: High CPU, Low Uptime" />;
              wasteBorder = "border-l-4 border-orange-400";
            } else {
              wasteIcon = <CheckCircleIcon className="inline-block w-5 h-5 text-green-500 mr-1" title="OK" />;
              wasteBorder = "border-l-4 border-green-400";
            }
            return (
              <tr key={inst.id} className={`${wasteStatus !== "OK" ? wasteClass : ""} ${wasteBorder}`}>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.name}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.type}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.region}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.cpu}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.ram}GB</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.gpu}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.uptime}h</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">${inst.costPerHour}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">{inst.jobId}</td>
                <td className="px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {wasteIcon}
                  <span className={
                    wasteStatus === "OK"
                      ? "text-green-600 dark:text-green-400"
                      : wasteStatus === "Underused"
                      ? "text-yellow-700 dark:text-yellow-300 font-semibold"
                      : "text-orange-700 dark:text-orange-300 font-semibold"
                  }>
                    {wasteLabel}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
