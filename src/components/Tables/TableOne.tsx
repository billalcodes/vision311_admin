// src/components/Tables/TableOne.tsx
import React from "react";
import { Report } from "@/types/requests";
import { useRecentReports } from "@/hooks/useAPIService";

const TableOne: React.FC = () => {
  const { data: reports, loading, error } = useRecentReports();

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Function to get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Resolved':
        return 'bg-success/10 text-success';
      case 'In Progress':
        return 'bg-warning/10 text-warning';
      case 'Declined':
        return 'bg-danger/10 text-danger';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white px-5 pb-5 pt-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-7.5 xl:pb-7">
      <div className="mb-6 flex justify-between">
        <h4 className="text-body-xlg font-bold text-dark dark:text-white">
          Recent Requests
        </h4>
        <button className="text-body-sm font-medium text-primary">
          View All
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-1 px-5 py-3 dark:bg-dark-2 sm:grid-cols-5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Request</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Date</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Department</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-20 text-red">
            Error loading reports
          </div>
        ) : reports && reports.length > 0 ? (
          reports.map((report: Report, index: number) => (
            <div
              key={index}
              className="grid grid-cols-3 border-b border-stroke px-5 py-4 dark:border-dark-3 sm:grid-cols-5"
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-dark dark:text-white">
                    {report.title}
                  </h5>
                  <p className="text-xs text-body-color dark:text-dark-6">
                    {report.location}
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-body-color dark:text-dark-6">
                  {report.category}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <span className={`rounded-md px-2.5 py-0.5 text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-body-color dark:text-dark-6">
                  {formatDate(report.createdAt)}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-body-color dark:text-dark-6">
                  {report.authority || 'N/A'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-20">
            <p className="text-sm text-body-color dark:text-dark-6">No reports found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOne;