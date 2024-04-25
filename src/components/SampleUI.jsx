import React from "react";
// import ApexCharts from 'apexcharts';


const SampleUI = () => {
//   var options = {
//     chart: {
//       type: "bar",
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//       },
//     },
//     series: [
//       {
//         data: [
//           {
//             x: "category A",
//             y: 10,
//           },
//           {
//             x: "category B",
//             y: 18,
//           },
//           {
//             x: "category C",
//             y: 13,
//           },
//         ],
//       },
//     ],
//   };
  return (
    <>
      <div className="search-bar font-custom1 top-1/2 mx-auto mt-12 relative bg-white min-w-sm max-w-3xl flex flex-row md:flex-row items-center justify-center border py-2 px-2 rounded-full gap-2 shadow-xl focus-within:border-gray-300">
        <input
          id="search-bar"
          placeholder="Enter your message here"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
        />
        <button className="w-auto md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-full transition-all disabled:opacity-70">
          <div className="flex items-center transition-all opacity-1 valid:">
            <span className="text-sm whitespace-nowrap truncate mx-auto">
              Search
            </span>
          </div>
        </button>
      </div>
      <div className="chart-area"></div>
    </>
  );
};

export default SampleUI;
