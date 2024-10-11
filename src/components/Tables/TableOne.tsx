import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "CDA",
    visitors: 35,
    revenues: "12",
    sales: 10,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "ITP",
    visitors: 22,
    revenues: "12",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "NHA",
    visitors: 21,
    revenues: "21",
    sales: 420,
    conversion: 4.7,
  },
  // {
  //   logo: "/images/brand/brand-04.svg",
  //   name: "Vimeo",
  //   visitors: 1.5,
  //   revenues: "3,580",
  //   sales: 389,
  //   conversion: 2.5,
  // },
  // {
  //   logo: "/images/brand/brand-05.svg",
  //   name: "Facebook",
  //   visitors: 1.2,
  //   revenues: "2,740",
  //   sales: 230,
  //   conversion: 1.9,
  // },
];

const TableOne = () => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Requested Departments
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Departments
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Requests
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Requests pending
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Reqests resolved
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {brand.visitors}K
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">
                ${brand.revenues}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.sales}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.conversion}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
