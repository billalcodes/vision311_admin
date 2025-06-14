// src/components/Charts/ChartOne.tsx
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { useTimelineData } from "@/hooks/useAPIService";

const ChartOne: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  const { data, loading, error } = useTimelineData(timeframe);

  // Default series if API hasn't loaded yet
  const defaultSeries = [
    {
      name: "Received Requests",
      data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
    },
    {
      name: "Closed requests",
      data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
    },
  ];

  // Use data from API if available, otherwise use defaults
  const series = data?.series || defaultSeries;
  const categories = data?.categories || [
    "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
  ];

  // Calculate the total requests for display at the bottom
  const totalReceived = series[0]?.data.reduce((sum, value) => sum + value, 0) || 0;
  const totalClosed = series[1]?.data.reduce((sum, value) => sum + value, 0) || 0;

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value.toLowerCase() as 'monthly' | 'yearly');
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Complaints Overview
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium uppercase text-dark dark:text-dark-6">
            Sort by:
          </p>
          <DefaultSelectOption 
            options={["Monthly", "Yearly"]} 
            onChange={handleTimeframeChange}
            defaultValue={timeframe === 'monthly' ? "Monthly" : "Yearly"}
          />
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red">
            Error loading data
          </div>
        ) : (
          <div className="-ml-4 -mr-5">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={310}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Received Requests</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {totalReceived}
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Closed Requests</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {totalClosed}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;