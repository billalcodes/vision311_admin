"use client";
import React from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import IssueTypeChart from "../Charts/IssueTypeChart";
import AIInsights from "../DataStats/AIInsights";
import LocationHotspots from "../Tables/LocationHotspots";
import UrgencyBreakdown from "../Charts/UrgencyBreakdown";
import ResolutionMetrics from "../DataStats/ResolutionMetrics";
import RecentActivity from "../Tables/RecentActivity";

const Admin: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark dark:text-white">CityFix Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of all public issue reports and their statuses
        </p>
      </div>
      
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        {/* <ChartTwo /> */}
        
        <IssueTypeChart />
        <AIInsights />
        
        <UrgencyBreakdown />
        <ResolutionMetrics />
        <RecentActivity />
        
        <LocationHotspots />
        
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default Admin;