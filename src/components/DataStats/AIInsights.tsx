import React from "react";

const AIInsights: React.FC = () => {
  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6">
      <div className="mb-6">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          AI Analysis Insights
        </h4>
        <p className="text-sm text-body-color dark:text-dark-6">
          Machine learning classification performance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="mb-2">
            <span className="text-3xl font-bold text-primary">78%</span>
          </div>
          <p className="text-sm text-body-color dark:text-dark-6">
            Average AI Confidence
          </p>
        </div>

        <div className="text-center">
          <div className="mb-2">
            <span className="text-3xl font-bold text-success">67%</span>
          </div>
          <p className="text-sm text-body-color dark:text-dark-6">
            High Confidence (80%+)
          </p>
        </div>

        <div className="text-center">
          <div className="mb-2">
            <span className="text-2xl font-semibold text-dark dark:text-white">8</span>
          </div>
          <p className="text-sm text-body-color dark:text-dark-6">
            Accurate Classifications
          </p>
        </div>

        <div className="text-center">
          <div className="mb-2">
            <span className="text-2xl font-semibold text-warning">2</span>
          </div>
          <p className="text-sm text-body-color dark:text-dark-6">
            Need Manual Review
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;