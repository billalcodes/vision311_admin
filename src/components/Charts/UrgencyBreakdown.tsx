import React from "react";
import { useDashboardData } from "@/hooks/useAPIService";

const UrgencyBreakdown: React.FC = () => {
  const { data, loading } = useDashboardData();
  
  const urgencyData = data?.urgencyStats || [];
  const total = urgencyData.reduce((sum: number, item: any) => sum + item.count, 0);
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <div className="mb-6">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Priority Distribution
        </h4>
        <p className="text-sm text-body-color dark:text-dark-6">
          Issues by urgency level
        </p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {urgencyData.map((item: any) => {
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${getUrgencyColor(item._id)}`}></div>
                  <span className="capitalize font-medium text-dark dark:text-white">
                    {item._id || 'Unknown'} Priority
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-dark dark:text-white mr-2">
                    {item.count}
                  </span>
                  <span className="text-sm text-body-color dark:text-dark-6">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UrgencyBreakdown;