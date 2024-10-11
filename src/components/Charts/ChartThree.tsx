import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

const ChartThree: React.FC = () => {
  const series = [65, 34, 12, 56];

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#ff4b25", "#2cff25", "#25bdff", "#6425ff"],
    labels: ["CDA", "FBR", "NHA", "ITP"],
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

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Requests per department
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div>
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-red-400"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> CDA </span>
                <span> 65% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-green-light"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> FBR </span>
                <span> 34% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-violet-600"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> ITP </span>
                <span> 45% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-400"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> NHA </span>
                <span> 12% </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
