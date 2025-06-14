// src/components/Charts/ChartTwo.tsx
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { useWeeklyRequests } from "@/hooks/useAPIService";

const ChartTwo: React.FC = () => {
  const { data, loading, error } = useWeeklyRequests();

  // Default series if API hasn't loaded yet
  const defaultSeries = [
    {
      name: "Total complaints",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Fulfilled",
      data: [13, 23, 20, 8, 13, 27, 15],
    },
  ];

  // Use data from API if available, otherwise use defaults
  const series = data?.series || defaultSeries;
  const categories = data?.categories || ["M", "T", "W", "T", "F", "S", "S"];

  const options: ApexOptions = {
    colors: ["#FF0000", "#008000"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
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

    xaxis: {
      categories: categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
        width: 16,
        height: 16,
        strokeWidth: 10,
        strokeColor: "transparent",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Requests this week
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["This Week", "Last Week"]} />
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
          <div id="chartTwo" className="-ml-3.5">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={370}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartTwo;