import React from "react";
import { useDashboardData } from "@/hooks/useAPIService";

const ResolutionMetrics: React.FC = () => {
  const { data, loading } = useDashboardData();

  const avgTime = data?.avgResolutionTime || 0;
  const resolvedCount = data?.resolvedCount || 0;

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <div className="mb-6">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Resolution Performance
        </h4>
        <p className="text-sm text-body-color dark:text-dark-6">
          How quickly issues get resolved
        </p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {avgTime} days
            </div>
            <p className="text-sm text-body-color dark:text-dark-6">
              Average Resolution Time
            </p>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-1 dark:bg-dark-2 rounded">
            <span className="text-sm font-medium text-dark dark:text-white">
              Total Resolved
            </span>
            <span className="text-xl font-bold text-success">
              {resolvedCount}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-1 dark:bg-dark-2 rounded">
            <span className="text-sm font-medium text-dark dark:text-white">
              Resolution Rate
            </span>
            <span className="text-xl font-bold text-warning">
              {resolvedCount > 0 ? Math.round((resolvedCount / 12) * 100) : 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResolutionMetrics;