import React from "react";
import { useDashboardData } from "@/hooks/useAPIService";

const RecentActivity: React.FC = () => {
  const { data, loading } = useDashboardData();
  
  const activities = data?.recentActivity || [];

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    return 'Just now';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-success';
      case 'In Progress': return 'text-warning';
      default: return 'text-danger';
    }
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <div className="mb-6">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Recent Activity
        </h4>
        <p className="text-sm text-body-color dark:text-dark-6">
          Latest reports and updates
        </p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.slice(0, 5).map((activity: any) => (
            <div key={activity._id} className="flex items-start justify-between p-3 bg-gray-1 dark:bg-dark-2 rounded">
              <div className="flex-1">
                <h5 className="font-medium text-dark dark:text-white text-sm">
                  {activity.title || activity.issueType}
                </h5>
                <p className="text-xs text-body-color dark:text-dark-6 mt-1">
                  📍 {activity.location}
                </p>
                <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-body-color dark:text-dark-6">
                  {formatTimeAgo(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;