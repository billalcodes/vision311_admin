import React from "react";

const IssueTypeChart: React.FC = () => {
  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6">
      <div className="mb-6">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Issue Types Distribution
        </h4>
        <p className="text-sm text-body-color dark:text-dark-6">
          Breakdown of reported issue categories
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-1 dark:bg-dark-2 rounded">
          <div className="text-2xl font-bold text-blue-500">5</div>
          <div className="text-sm">Potholes</div>
        </div>
        <div className="text-center p-4 bg-gray-1 dark:bg-dark-2 rounded">
          <div className="text-2xl font-bold text-red-500">3</div>
          <div className="text-sm">Streetlights</div>
        </div>
        <div className="text-center p-4 bg-gray-1 dark:bg-dark-2 rounded">
          <div className="text-2xl font-bold text-green-500">2</div>
          <div className="text-sm">Graffiti</div>
        </div>
        <div className="text-center p-4 bg-gray-1 dark:bg-dark-2 rounded">
          <div className="text-2xl font-bold text-yellow-500">2</div>
          <div className="text-sm">Other</div>
        </div>
      </div>
    </div>
  );
};

export default IssueTypeChart;