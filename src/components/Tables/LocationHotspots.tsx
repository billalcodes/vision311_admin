import React from "react";

const LocationHotspots: React.FC = () => {
  const locations = [
    { name: "Main Street", count: 3, confidence: 85 },
    { name: "Oak Avenue", count: 2, confidence: 75 },
    { name: "City Park", count: 2, confidence: 90 },
  ];

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6">
      <div className="mb-6">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Issue Hotspots
        </h4>
        <p className="text-sm text-body-color dark:text-dark-6">
          Locations with most reported issues
        </p>
      </div>

      <div className="space-y-4">
        {locations.map((location, index) => (
          <div key={location.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-1 dark:bg-dark-2">
            <div className="flex items-center">
              <div className="mr-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                  {index + 1}
                </span>
              </div>
              <div>
                <h5 className="font-semibold text-dark dark:text-white">
                  {location.name}
                </h5>
                <p className="text-sm text-body-color dark:text-dark-6">
                  AI Confidence: {location.confidence}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-primary">
                {location.count}
              </span>
              <p className="text-sm text-body-color dark:text-dark-6">
                reports
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationHotspots;