// src/components/Charts/ChartThree.tsx
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { useDepartmentStats } from "@/hooks/useAPIService";

const ChartThree: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  const { data, loading, error } = useDepartmentStats(timeframe);

  // Default colors for departments
  const departmentColors = ["#ff4b25", "#2cff25", "#25bdff", "#6425ff", "#ff25c8", "#fdff25"];
  
  // Default data if API hasn't loaded yet
  const series = data?.counts || [65, 34, 12, 56];
  const labels = data?.departments || ["CDA", "FBR", "NHA", "ITP"];
  const percentages = data?.percentages || [65, 34, 12, 56];

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: departmentColors.slice(0, labels.length),
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Requests",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as 'monthly' | 'yearly');
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Requests per department
          </h4>
        </div>
        <div>
          <DefaultSelectOption 
            options={["Monthly", "Yearly"]} 
            onChange={handleTimeframeChange}
            defaultValue={timeframe === 'monthly' ? "Monthly" : "Yearly"}
          />
        </div>
      </div>

      <div className="mb-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red">
            Error loading data
          </div>
        ) : (
          <div className="mx-auto flex justify-center">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        )}
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          {labels.map((label, index) => (
            <div key={label} className="w-full px-7.5 sm:w-1/2">
              <div className="flex w-full items-center">
                <span 
                  className="mr-2 block h-3 w-full max-w-3 rounded-full" 
                  style={{ backgroundColor: departmentColors[index % departmentColors.length] }}
                ></span>
                <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                  <span> {label} </span>
                  <span> {percentages[index]}% </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;